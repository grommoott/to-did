import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { HashService } from "src/helpers/hash/hash.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hashService: HashService) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User()
        user.username = createUserDto.username;
        user.passwordHash = await this.hashService.hash(createUserDto.password)
        this.userRepository.save(user)
        return user
    }
}
