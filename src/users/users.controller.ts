import {Body, Controller, Post, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('signup')
    createUser(@Body() body: CreateUserDto){
        console.log(body);
        this.userService.create(body.email, body.password);
        
    }

    @Get(':id')
    findUser(@Param('id') id: string){
        return this.userService.findOne(parseInt(id));
    }

    @Get('')
    findAll(@Query('email') email: string){
        return this.userService.find(email);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));

    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body);
    }
}