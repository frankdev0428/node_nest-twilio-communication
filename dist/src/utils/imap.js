"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMailbox = void 0;
const Imap = require("imap");
const mailparser_1 = require("mailparser");
const replyParser = require("node-email-reply-parser");
function setupMailbox(email, password, cb) {
    let count = 0;
    let isOpenInbox = false;
    console.log('--------------------setupMailbox--------------------');
    console.log(email, password);
    console.log('--------------------setupMailbox--------------------');
    const getEmailFromInbox = (mailServer, num) => {
        mailServer.openBox('INBOX', false, function (err, box) {
            if (err)
                throw err;
            if (!num) {
                return;
            }
            mailServer.search(['UNSEEN', ['SINCE', new Date()]], function (err, results) {
                console.log(err, results);
                if (!err) {
                    let f = mailServer.fetch(results, {
                        bodies: '',
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
                            (0, mailparser_1.simpleParser)(stream, async (err, parsed) => {
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
                                    }
                                    else {
                                        fromValue = fromInfo.value[0].address;
                                    }
                                }
                                if (toInfo && toInfo.value) {
                                    if (typeof toInfo.value == "string") {
                                        toValue = toInfo.value;
                                    }
                                    else {
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
                                    const email = replyParser(content);
                                    cb(from, to, subject, text, email.getVisibleText({ aggressive: true }), messageId);
                                }
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
    };
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
    }).on('error', function (err) {
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
            if (err)
                throw err;
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
exports.setupMailbox = setupMailbox;
//# sourceMappingURL=imap.js.map