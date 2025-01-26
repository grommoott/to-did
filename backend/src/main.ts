import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as cors from "cors"

async function bootstrap() {
    config()
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser())
    app.use(cors())
    await app.listen(process.env.PORT ?? 7777)
}
bootstrap();
