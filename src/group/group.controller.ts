import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { AddGroupDto } from './dto';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) { }

    @Post(':pengantarId')
    addGroup(@Body() dto: AddGroupDto, @Param('pengantarId', ParseIntPipe) pengantarId: number) {
        return this.groupService.addGroup(dto, pengantarId);
    }

    @Put(':id')
    updateGroup(@Body() dto: AddGroupDto, @Param('id', ParseIntPipe) id: number) {
        return this.groupService.updateGroup(dto, id);
    }

    @Delete(':id')
    deleteGroup(@Param('id', ParseIntPipe) id: number) {
        return this.groupService.deleteGroup(id);
    }
}
