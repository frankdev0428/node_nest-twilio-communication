"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const customer_module_1 = require("./customer/customer.module");
const data_source_1 = require("./data-source");
const jwt_strategy_1 = require("./guard/jwt.strategy");
const help_module_1 = require("./help/help.module");
const chat_module_1 = require("./twilio/chat/chat.module");
const email_module_1 = require("./twilio/email/email.module");
const facebook_module_1 = require("./twilio/facebook/facebook.module");
const sms_module_1 = require("./twilio/sms/sms.module");
const voice_module_1 = require("./twilio/voice/voice.module");
const webchat_module_1 = require("./twilio/webchat/webchat.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const stripe_module_1 = require("./stripe/stripe.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY,
                signOptions: {
                    expiresIn: '30d',
                    issuer: 'communicate-backend',
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'public', 'upload'),
            }),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => email_module_1.EmailModule),
            (0, common_1.forwardRef)(() => sms_module_1.SMSModule),
            (0, common_1.forwardRef)(() => voice_module_1.VoiceModule),
            (0, common_1.forwardRef)(() => facebook_module_1.FacebookModule),
            (0, common_1.forwardRef)(() => chat_module_1.ChatModule),
            (0, common_1.forwardRef)(() => webchat_module_1.WebchatModule),
            (0, common_1.forwardRef)(() => customer_module_1.CustomerModule),
            (0, common_1.forwardRef)(() => help_module_1.HelpModule),
            (0, common_1.forwardRef)(() => stripe_module_1.StripeModule),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: 'DATA_SOURCE',
                useFactory: async () => {
                    return data_source_1.AppDataSource.initialize();
                }
            },
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map