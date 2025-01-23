import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest()
        const accessToken = req.cookies["Access-Token"]

        try {
            const payload = await this.jwtService.verifyAsync(accessToken, { secret: this.configService.get("JWT_SECRET") })

            req["user"] = payload
        } catch (e) {
            throw new UnauthorizedException()
        }

        return true
    }
}
