import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { HashService } from "src/helpers/hash/hash.service";
import { GetUserDto } from "./dto/get-user.dto";
import { IUser } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hashService: HashService) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User()
        user.username = createUserDto.username
        user.passwordHash = await this.hashService.hash(createUserDto.password)
        return this.userRepository.save(user)
    }

    async getUser(id: number): Promise<IUser> {
        const user = await this.userRepository.findOneBy({ id: id })

        if (user == null) {
            throw new NotFoundException()
        }

        return user
    }
}
