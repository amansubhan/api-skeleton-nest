import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { UsersService } from './users/users.service'
import { JwtModule } from '@nestjs/jwt'
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
    imports: [
        UsersModule,
        AuthModule,
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '600s' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
