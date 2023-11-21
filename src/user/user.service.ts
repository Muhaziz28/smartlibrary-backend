import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(protected prisma: PrismaService) { }

    async profile(user: User) {
        return this.prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
    }
}
