import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SesiMataKuliahService {
    constructor(private prisma: PrismaService) { }


}
