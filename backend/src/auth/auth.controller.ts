import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { CookieOptions, Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.login(loginDto)

        const options: CookieOptions = {
            maxAge: 1200_000,
            httpOnly: true,
            sameSite: "strict"
        }

        res.cookie("Access-Token", tokens.access, options)
        res.cookie("Refresh-Token", tokens.refresh, { ...options, path: "/auth/refresh" })
    }
}
