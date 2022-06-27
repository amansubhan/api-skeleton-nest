import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from '../app/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { ConfigModule } from "@nestjs/config";
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '3d' },
        }),
    ],
    providers: [ AuthService, LocalStrategy, JwtStrategy ],
    exports: [ AuthService ],
    controllers: [ AuthController ]
})
export class AuthModule {}
