"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const GraphApi_1 = require("./GraphApi");
class Profile {
    async setWebhook() {
        await GraphApi_1.GraphApi.callSubscriptionsAPI();
        await GraphApi_1.GraphApi.callSubscribedApps();
    }
    setPageFeedWebhook() {
    }
}
exports.Profile = Profile;
;
//# sourceMappingURL=Profile.js.map