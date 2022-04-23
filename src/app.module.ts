import { Module } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { User } from "./users/user.entity";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host:  process.env.DATABASE_HOST,
            port:  parseInt(process.env.DATABASE_PORT, 10),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DBNAME,
            entities: [User],
            synchronize: true,
        }),
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
