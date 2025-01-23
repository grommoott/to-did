import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { Tokens } from "./entity/tokens.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Tokens) private readonly tokensRepository: Repository<Tokens>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async login(loginDto: LoginDto): Promise<Tokens> {
        const userTarget = new User()
        userTarget.username = loginDto.username
        userTarget.passwordHash

        const user = await this.userRepository.findOneBy(userTarget)

        if (user == null) {
            throw new NotFoundException()
        }

        const tokens = new Tokens()
        tokens.access = await this.jwtService.signAsync({ id: user.id }, { expiresIn: "20m", secret: this.configService.get("JWT_SECRET") })
        tokens.refresh = await this.jwtService.signAsync({ id: user.id }, { expiresIn: "15d", secret: this.configService.get("JWT_SECRET") })

        await this.tokensRepository.update({ user }, { ...tokens })

        return tokens
    }
}
