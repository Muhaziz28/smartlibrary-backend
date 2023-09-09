import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Role } from "@prisma/client";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        // console.log('User => ', request.user);
        console.log('Role => ', request.user['role']);
        return request.user;
    }
)