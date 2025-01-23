import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { Tokens } from "./entity/tokens.entity";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, @InjectRepository(Tokens) private readonly tokensRepository: Repository<Tokens>) { }

    async login(loginDto: LoginDto): Promise<Tokens> {
        const userTarget = new User()
        userTarget.username = loginDto.username
        userTarget.passwordHash

        const user = await this.userRepository.findOneBy(userTarget)

        if (user == null) {
            throw new NotFoundException()
        }

        let tokens = await this.tokensRepository.findOneBy({ id: user.id })

        if (tokens == null) {
            throw new InternalServerErrorException()
        }

        return tokens
    }
}
