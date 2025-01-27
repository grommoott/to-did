import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { Tokens } from "./entity/tokens.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { HashService } from "src/helpers/hash/hash.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Tokens) private readonly tokensRepository: Repository<Tokens>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly hashService: HashService
    ) { }
    async login(loginDto: LoginDto): Promise<Tokens> {
        const userTarget = new User()
        userTarget.username = loginDto.username

        const user = await this.userRepository.findOneBy(userTarget)

        if (user == null) {
            throw new NotFoundException()
        }

        if (!(await this.hashService.compare(user.passwordHash, loginDto.password))) {
            throw new UnauthorizedException()
        }

        const tokens = new Tokens()
        tokens.access = await this.jwtService.signAsync({ id: user.id }, { expiresIn: "20m", secret: this.configService.get("JWT_SECRET") })
        tokens.refresh = await this.jwtService.signAsync({ id: user.id }, { expiresIn: "15d", secret: this.configService.get("JWT_SECRET") })

        await this.tokensRepository.update({ user }, { ...tokens })

        return tokens
    }

    async refresh(refreshToken: string): Promise<Tokens> {
        let tokens
        let payload

        try {
            payload = this.jwtService.verify(refreshToken, { secret: this.configService.get("JWT_SECRET") })
            tokens = await this.tokensRepository.findOneBy({ user: { id: payload.id } })
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException()
        }

        if (tokens == null) {
            throw new NotFoundException()
        }

        tokens.access = await this.jwtService.signAsync({ id: payload.id }, { expiresIn: "20m", secret: this.configService.get("JWT_SECRET") })
        tokens.refresh = await this.jwtService.signAsync({ id: payload.id }, { expiresIn: "15d", secret: this.configService.get("JWT_SECRET") })

        return await this.tokensRepository.save(tokens)
    }
}
