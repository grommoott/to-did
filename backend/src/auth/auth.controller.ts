import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { CookieOptions, Request, Response } from "express";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    private cookieOptions: CookieOptions = {
        maxAge: 1200_000,
        httpOnly: true,
        sameSite: "strict"
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.login(loginDto)

        res.cookie("Access-Token", tokens.access, this.cookieOptions)
        res.cookie("Refresh-Token", tokens.refresh, { ...this.cookieOptions, path: "/auth/refresh" })
    }

    @UseGuards(AuthGuard)
    @Post("refresh")
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.refresh(req.cookies["Refresh-Token"])

        res.cookie("Access-Token", tokens.access, this.cookieOptions)
        res.cookie("Refresh-Token", tokens.refresh, { ...this.cookieOptions, path: "/auth/refresh" })
    }

    @Post("logout")
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie("Access-Token")
        res.clearCookie("Refresh-Token")
    }
}
