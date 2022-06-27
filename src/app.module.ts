import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from './app/users/users.module'
import { AuthModule } from './auth/auth.module'
import { ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './app/accounts/accounts.module';
import configuration from './config/configuration';
import { Account } from './app/accounts/account.entity';
import { User } from "./app/users/user.entity";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ configuration ],
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get<number>('DATABASE_PORT'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_DBNAME'),
                entities: [ User, Account ],
                synchronize: true,
            }),
            inject: [ ConfigService ],
        }),
        AuthModule,
        UsersModule,
        AccountsModule,
    ],
})
export class AppModule {}
