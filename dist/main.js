"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const express_1 = require("express");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('/api');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Girs API Documentation')
        .setDescription('The Girs API description')
        .setVersion('1.0')
        .addTag('girs-api')
        .addBearerAuth({
        type: 'http',
        name: 'Authorization',
        in: 'header',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use((0, express_1.json)({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ limit: '10mb', extended: true }));
    app.enableCors();
    const server = await app.listen(process.env.EXPRESS_PORT || 3000);
    const timeout = 1000 * 60 * 3;
    server.setTimeout(timeout);
}
bootstrap();
//# sourceMappingURL=main.js.map