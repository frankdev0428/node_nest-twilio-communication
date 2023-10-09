"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '.env.local' });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entity/user.entity");
const platform_express_1 = require("@nestjs/platform-express");
const server = Express();
server.use(cors());
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors({
        allowedHeaders: ['content-type'],
        origin: [process.env.WEB_SOCKET_ORIGIN, "https://*.communicate.io", "http://busin.communicate.io", "https://test.communicate.io", 'https://business.communicate.io', 'http://localhost:3001', 'http://authpoc.communicate.io', 'https://authpoc.communicate.io'],
        credentials: true,
    });
    app.use(morgan('tiny'));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('communicate API Guide')
        .setDescription('communicate API description')
        .setVersion('1.0')
        .addBearerAuth({
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [
            user_entity_1.default
        ]
    });
    swagger_1.SwaggerModule.setup('api-document', app, document);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map