import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { TelegramModule } from "src/telegram/telegram.module";
import { TelegramService } from "src/telegram/telegram.service";
// import { TelegramModule } from "src/telegram/telegram.module";

@Module({
    imports: [JwtModule.register({}), TelegramModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, TelegramService]
})
export class AuthModule { }