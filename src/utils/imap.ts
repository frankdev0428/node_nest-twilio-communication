import * as Imap from 'imap';
import { simpleParser } from 'mailparser';
import * as replyParser from 'node-email-reply-parser';
// import { inspect } from 'util';
// import * as htmlToText from 'html-to-text';
import * as parse from 'parse-email';

export function setupMailbox(email, password, cb) {
  // const email = "communications@communicate.io";
  // const password = "uxrauqpmtvnfmelz";
  let count = 0;
  let isOpenInbox = false;
  console.log('--------------------setupMailbox--------------------');
  console.log(email, password);
  console.log('--------------------setupMailbox--------------------');

  const getEmailFromInbox = (mailServer, num) => {
    mailServer.openBox('INBOX', false, function (err, box) {
      if (err) throw err;
      if (!num) {
        return;
      }

      mailServer.search(['UNSEEN', ['SINCE', new Date()]], function (err, results) {
        console.log(err, results)
        if (!err) {
          let f = mailServer.fetch(results, {
            // bodies: ['HEADER.FIELDS (Message-ID FROM TO SUBJECT DATE)', 'FULL'],
            bodies: '',
            // struct: true
          });

          f.on('message', function (msg, seqno) {
            console.log('Message #%d', seqno);
            let from = "";
            let to = "";
            let subject = "";
            let content = "";
            let messageId = "";
            let text = "";

            msg.on('body', function (stream, info) {
              // console.log(stream);
              // parse(stream)
              //   .then((email) => {
              //     console.log(email)
              //   })
              simpleParser(stream, async (err, parsed) => {
                console.log(parsed);
                const messageIdValue = parsed.headers.get("message-id");
                const fromInfo = parsed.headers.get("from");
                const toInfo = parsed.headers.get("to");
                let fromValue = "";
                let toValue = "";
                const subjectValue = parsed.headers.get("subject");
                const contentValue = parsed.html;
                const textValue = parsed.text;

                if (fromInfo && fromInfo.value) {
                  if (typeof fromInfo.value == "string") {
                    fromValue = fromInfo.value;
                  } else {
                    fromValue = fromInfo.value[0].address;
                  }
                }
                if (toInfo && toInfo.value) {
                  if (typeof toInfo.value == "string") {
                    toValue = toInfo.value;
                  } else {
                    toValue = toInfo.value[0].address;
                  }
                }

                if (fromValue) {
                  from = fromValue;
                }

                if (toValue) {
                  to = toValue;
                }

                if (textValue) {
                  text = textValue;
                }

                if (subjectValue) {
                  subject = subjectValue;
                }

                if (contentValue) {
                  content = contentValue;
                }

                if (messageIdValue) {
                  messageId = messageIdValue;
                }

                if (from && to && content) {
                  // console.log("=====finished====================", from, to, subject, messageId);
                  const email = replyParser(content);

                  // console.log('-------------------visible text------------');
                  // console.log(email.getVisibleText({ aggressive: true }));
                  // console.log(email.getVisibleText());
                  // console.log('-------------------fragments------------');
                  // console.log(email.getFragments());
                  cb(from, to, subject, text, email.getVisibleText({ aggressive: true }), messageId);
                }

                // console.log("====================", parsed.headers.from);
                // console.log("====================", parsed.headers.from.value);
              });
            });
          });

          f.once('error', function (err) {
            console.log('Fetch error: ' + err);
            mailServer.setFlags(results, ['\\Seen'], (err) => {
              if (err) {
                throw err;
              }
            });
          });

          f.once('end', function () {
            console.log('Done fetching all messages!');
            mailServer.setFlags(results, ['\\Seen'], (err) => {
              if (err) {
                throw err;
              }
            });
          });
        }
      });
    });
  }

  const mailServer = new Imap({
    user: email,
    password: password,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false
    },
    authTimeout: 10000
  }).on('error', function (err: Error) {
    console.log('-------------------Source Server Error:- ', err);
    console.log(mailServer.state);
    if (mailServer.state != 'authenticated' && count < 5) {
      count++;
      mailServer.connect();
    }
  });

  mailServer.on('ready', function () {
    console.log('-------------------Source Server Ready');
    if (mailServer.state != 'authenticated') {
      mailServer.connect();
    }
    mailServer.openBox('INBOX', true, function (err, box) {
      if (err) throw err;
      console.log('message', 'server1 ready');
      isOpenInbox = true;
    });
  });

  mailServer.on('mail', (numNewMsgs) => {
    console.log("--------------------New mail received", numNewMsgs, isOpenInbox);
    if (!isOpenInbox) {
      return;
    }
    if (numNewMsgs) {
      getEmailFromInbox(mailServer, numNewMsgs);
    }
  });

  mailServer.on('end', () => {
    console.log('---------Connection ended');
    if (mailServer.state != 'authenticated' && process.env.MODE != 'localhost') {
      setTimeout(() => {
        mailServer.connect();
      }, 5000);
    }
  });

  mailServer.on('close', () => {
    console.log('---------Connection closed');
    if (mailServer.state != 'authenticated' && process.env.MODE != 'localhost') {
      setTimeout(() => {
        mailServer.connect();
      }, 5000);
    }
  });


  mailServer.connect();

  return mailServer;
}