/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

import { WEBHOOK_URL } from "../utils";

// Imports dependencies
import * as fetch from "node-fetch";
import { URL, URLSearchParams } from "url";

// const API_URL = "https://graph.facebook.com/v15.0";
const API_URL1 = "https://graph.facebook.com";

export class GraphApi {
  // static async callSendApi(requestBody) {
  //   let url = new URL(`${config.apiUrl}/me/messages`);
  //   url.search = new URLSearchParams({
  //     access_token: config.pageAccesToken
  //   });
  //   console.warn("Request body is\n" + JSON.stringify(requestBody));
  //   console.warn("Request body is\n" + JSON.stringify(requestBody));
  //   let response = await fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(requestBody)
  //   });
  //   if (!response.ok) {
  //     console.warn(
  //       `Unable to call Send API: ${response.statusText}`,
  //       await response.json()
  //     );
  //   }
  // }

  // static async callMessengerProfileAPI(requestBody) {
  //   // Send the HTTP request to the Messenger Profile API

  //   console.log(`Setting Messenger Profile for app ${config.appId}`);
  //   let url = new URL(`${config.apiUrl}/me/messenger_profile`);
  //   url.search = new URLSearchParams({
  //     access_token: config.pageAccesToken
  //   });
  //   let response = await fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(requestBody)
  //   });
  //   if (response.ok) {
  //     console.log(`Request sent.`);
  //   } else {
  //     console.warn(
  //       `Unable to callMessengerProfileAPI: ${response.statusText}`,
  //       await response.json()
  //     );
  //   }
  // }

  static async callSubscriptionsAPI(customFields: any = undefined) {
    // Send the HTTP request to the Subscriptions Edge to configure your webhook
    // You can use the Graph API's /{app-id}/subscriptions edge to configure and
    // manage your app's Webhooks product
    // https://developers.facebook.com/docs/graph-api/webhooks/subscriptions-edge
    console.log(
      `Setting app ${process.env.FACEBOOK_APP_ID} callback url to ${WEBHOOK_URL}`
    );

    let fields =
      "messages, messaging_postbacks, messaging_optins, " +
      "message_deliveries, messaging_referrals";

    if (customFields !== undefined) {
      fields = fields + ", " + customFields;
    }

    console.log({ fields });

    let url = new URL(`${API_URL1}/${process.env.FACEBOOK_APP_ID}/subscriptions`);
    url.search = new URLSearchParams({
      access_token: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
      object: "page",
      callback_url: WEBHOOK_URL,
      verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
      fields: fields,
      include_values: "true"
    }).toString();
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      console.log(await response.json());
      console.log(`------------------------Request sent.-------------------------`);
      let url1 = new URL(`${API_URL1}/${process.env.FACEBOOK_APP_ID}/subscriptions`);
      url1.search = new URLSearchParams({
        access_token: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
      }).toString();
      let response1 = await fetch(url1, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      // console.log(response1);
      const data = await response1.json();
      console.log(
        `-------------callSubscriptionsAPI: ${response1.statusText}`,
        data
      );
      console.log(data.data[0].fields);
    } else {
      console.error(
        `Unable to callSubscriptionsAPI: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async callSubscribedApps(customFields: any = undefined) {
    // Send the HTTP request to subscribe an app for Webhooks for Pages
    // You can use the Graph API's /{page-id}/subscribed_apps edge to configure
    // and manage your pages subscriptions
    // https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps
    console.log(`Subscribing app ${process.env.FACEBOOK_APP_ID} to page ${process.env.FACEBOOK_PAGE_ID}`);

    // let fields =
    //   "messages, messaging_postbacks, messaging_optins, " +
    //   "message_deliveries, messaging_referrals";

    let fields = "messages";
    if (customFields !== undefined) {
      fields = fields + ", " + customFields;
    }

    console.log({ fields });

    let url = new URL(`${API_URL1}/${process.env.FACEBOOK_PAGE_ID}/subscribed_apps`);
    url.search = new URLSearchParams({
      access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      // access_token: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
      subscribed_fields: fields
    }).toString();
    let response = await fetch(url, {
      method: "POST"
    });
    if (response.ok) {
      console.log(`************************Request sent.`);
    } else {
      console.error(
        `Unable to callSubscribedApps: ${response.statusText}`,
        await response.json()
      );
      console.log(process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
      let url1 = new URL(`${API_URL1}/${process.env.FACEBOOK_PAGE_ID}/subscribed_apps`);
      url1.search = new URLSearchParams({
        access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
        // access_token: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
        subscribed_fields: fields
      }).toString();
      let response1 = await fetch(url1, {
        method: "GET"
      });
      console.error(
        `callSubscribedApps: ${response1.statusText}`,
        await response1.json()
      );
    }
  }

  // static async getUserProfile(senderIgsid) {
  //   let url = new URL(`${config.apiUrl}/${senderIgsid}`);
  //   url.search = new URLSearchParams({
  //     access_token: config.pageAccesToken,
  //     fields: "first_name, last_name, gender, locale, timezone"
  //   });
  //   let response = await fetch(url);
  //   if (response.ok) {
  //     let userProfile = await response.json();
  //     return {
  //       firstName: userProfile.first_name,
  //       lastName: userProfile.last_name,
  //       gender: userProfile.gender,
  //       locale: userProfile.locale,
  //       timezone: userProfile.timezone
  //     };
  //   } else {
  //     console.warn(
  //       `Could not load profile for ${senderIgsid}: ${response.statusText}`,
  //       await response.json()
  //     );
  //     return null;
  //   }
  // }

  // static async getPersonaAPI() {
  //   // Send the POST request to the Personas API
  //   console.log(`Fetching personas for app ${config.appId}`);

  //   let url = new URL(`${config.apiUrl}/me/personas`);
  //   url.search = new URLSearchParams({
  //     access_token: config.pageAccesToken
  //   });
  //   let response = await fetch(url);
  //   if (response.ok) {
  //     let body = await response.json();
  //     return body.data;
  //   } else {
  //     console.warn(
  //       `Unable to fetch personas for ${config.appId}: ${response.statusText}`,
  //       await response.json()
  //     );
  //     return null;
  //   }
  // }

  // static async postPersonaAPI(name, profile_picture_url) {
  //   let requestBody = {
  //     name,
  //     profile_picture_url
  //   };
  //   console.log(`Creating a Persona for app ${config.appId}`);
  //   console.log({ requestBody });
  //   let url = new URL(`${config.apiUrl}/me/personas`);
  //   url.search = new URLSearchParams({
  //     access_token: config.pageAccesToken
  //   });
  //   let response = await fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(requestBody)
  //   });
  //   if (response.ok) {
  //     console.log(`Request sent.`);
  //     let json = await response.json();
  //     return json.id;
  //   } else {
  //     console.error(
  //       `Unable to postPersonaAPI: ${response.statusText}`,
  //       await response.json()
  //     );
  //   }
  // }

  // static async callNLPConfigsAPI() {
  //   // Send the HTTP request to the Built-in NLP Configs API
  //   // https://developers.facebook.com/docs/graph-api/reference/page/nlp_configs/

  //   console.log(`Enable Built-in NLP for Page ${config.pageId}`);

  //   let url = new URL(`${config.apiUrl}/me/nlp_configs`);
  //   url.search = new URLSearchParams({
  //     access_token: config.pageAccesToken,
  //     nlp_enabled: true
  //   });
  //   let response = await fetch(url, {
  //     method: "POST"
  //   });
  //   if (response.ok) {
  //     console.log(`Request sent.`);
  //   } else {
  //     console.error(`Unable to activate built-in NLP: ${response.statusText}`);
  //   }
  // }

  // static async reportLeadSubmittedEvent(psid) {
  //   let url = new URL(`${config.apiUrl}/${config.appId}/page_activities`);
  //   url.search = new URLSearchParams({
  //     access_token: config.pageAccesToken
  //   });
  //   let requestBody = {
  //     custom_events: [
  //       {
  //         _eventName: "lead_submitted"
  //       }
  //     ],
  //     advertiser_tracking_enabled: 1,
  //     application_tracking_enabled: 1,
  //     page_id: config.pageId,
  //     page_scoped_user_id: psid,
  //     logging_source: "messenger_bot",
  //     logging_target: "page"
  //   };
  //   console.warn(
  //     "Request to " + url + "\nWith body:\n" + JSON.stringify(requestBody)
  //   );
  //   try {
  //     let response = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(requestBody)
  //     });
  //     if (!response.ok) {
  //       console.warn(
  //         `Unable to call App Event API: ${response.statusText}`,
  //         await response.json()
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error while reporting lead submitted", error);
  //   }
  // }
};
