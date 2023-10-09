"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphApi = void 0;
const utils_1 = require("../utils");
const fetch = require("node-fetch");
const url_1 = require("url");
const API_URL1 = "https://graph.facebook.com";
class GraphApi {
    static async callSubscriptionsAPI(customFields = undefined) {
        console.log(`Setting app ${process.env.FACEBOOK_APP_ID} callback url to ${utils_1.WEBHOOK_URL}`);
        let fields = "messages, messaging_postbacks, messaging_optins, " +
            "message_deliveries, messaging_referrals";
        if (customFields !== undefined) {
            fields = fields + ", " + customFields;
        }
        console.log({ fields });
        let url = new url_1.URL(`${API_URL1}/${process.env.FACEBOOK_APP_ID}/subscriptions`);
        url.search = new url_1.URLSearchParams({
            access_token: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
            object: "page",
            callback_url: utils_1.WEBHOOK_URL,
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
            let url1 = new url_1.URL(`${API_URL1}/${process.env.FACEBOOK_APP_ID}/subscriptions`);
            url1.search = new url_1.URLSearchParams({
                access_token: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
            }).toString();
            let response1 = await fetch(url1, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response1.json();
            console.log(`-------------callSubscriptionsAPI: ${response1.statusText}`, data);
            console.log(data.data[0].fields);
        }
        else {
            console.error(`Unable to callSubscriptionsAPI: ${response.statusText}`, await response.json());
        }
    }
    static async callSubscribedApps(customFields = undefined) {
        console.log(`Subscribing app ${process.env.FACEBOOK_APP_ID} to page ${process.env.FACEBOOK_PAGE_ID}`);
        let fields = "messages";
        if (customFields !== undefined) {
            fields = fields + ", " + customFields;
        }
        console.log({ fields });
        let url = new url_1.URL(`${API_URL1}/${process.env.FACEBOOK_PAGE_ID}/subscribed_apps`);
        url.search = new url_1.URLSearchParams({
            access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
            subscribed_fields: fields
        }).toString();
        let response = await fetch(url, {
            method: "POST"
        });
        if (response.ok) {
            console.log(`************************Request sent.`);
        }
        else {
            console.error(`Unable to callSubscribedApps: ${response.statusText}`, await response.json());
            console.log(process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
            let url1 = new url_1.URL(`${API_URL1}/${process.env.FACEBOOK_PAGE_ID}/subscribed_apps`);
            url1.search = new url_1.URLSearchParams({
                access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
                subscribed_fields: fields
            }).toString();
            let response1 = await fetch(url1, {
                method: "GET"
            });
            console.error(`callSubscribedApps: ${response1.statusText}`, await response1.json());
        }
    }
}
exports.GraphApi = GraphApi;
;
//# sourceMappingURL=GraphApi.js.map