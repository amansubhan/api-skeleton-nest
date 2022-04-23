import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { UserDto } from "./user-dto";

@Controller({ path: '/users', version: '1' })
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    create(@Body() userDto: UserDto): Promise<User> {
        return this.usersService.create(userDto);
    }
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(parseInt(id,10));
    }

    @Delete()
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }

    @Put()
    update(@Body() body): Promise<User>  {
        return this.usersService.update(body);
    }
}
