import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("status")
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    console.log("Inside status controller");
    console.log(req.user);
  }

  @Post("login")
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }
}
