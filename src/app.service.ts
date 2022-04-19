import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHello(): object {
        return { enviornment: process.env.ENV }
    }
}
