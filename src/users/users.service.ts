import { Injectable } from '@nestjs/common'
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./user-dto";

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
    ) {}

    create(userDto: UserDto): Promise<User> {
        const user = new User();

        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.email = userDto.email;
        user.password = userDto.password;
        user.isActive = userDto.isActive

        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findById(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({where: {email: email}});
    }

    async update(userDto: UserDto): Promise<User> {
        const user = await this.findById(userDto.id);
        return this.usersRepository.save(this.usersRepository.merge(user, userDto))
    }
}
