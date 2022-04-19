import { Controller, Get, Param, UseGuards, Version } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller({ path: '/users', version: '1' })
@UseGuards(JwtAuthGuard)
export class UsersController {
    @Get()
    findAll(): string {
        return 'This action returns all users'
    }

    @Get()
    @Version('2')
    findAllv2(): string {
        return 'This new v2 action returns all users'
    } // This is a GET request

    @Get('/:id')
    findOne(@Param('id') id: string): string {
        return `This action returns user #${id}`
    } // This is a GET request
}
