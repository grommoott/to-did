import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    config()
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser())
    await app.listen(process.env.PORT ?? 7777)
}
bootstrap();
