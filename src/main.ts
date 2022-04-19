import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as compression from 'compression'
import { VersioningType } from '@nestjs/common'
dotenv.config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    })
    app.enableVersioning({
        type: VersioningType.URI,
    })

    app.use(compression())

    await app.listen(process.env.PORT)
}
bootstrap()
