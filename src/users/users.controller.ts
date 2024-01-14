import {Body, Controller, Post, Get, Patch, Param, Query, Delete, } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService){}

    @serialize(UserDto)
    @Post('signup')
    createUser(@Body() body: CreateUserDto){
        console.log(body);
        return this.authService.signUp(body.email, body.password);
    }

    @serialize(UserDto)
    @Post('signin')
    login(@Body() body: CreateUserDto){
        return this.authService.signIn(body.email, body.password);
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // instead of using the above line of code, we will use our custom decorator
    @serialize(UserDto)
    @Get(':id')
    findUser(@Param('id') id: string){
        console.log("Handler is running");
        return this.userService.findOne(parseInt(id));
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // instead of using the above line of code, we will use our custom decorator
    @serialize(UserDto)
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
