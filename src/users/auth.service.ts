import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { scrypt as _scrypt, randomBytes} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
const salt = "AAFFAA";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){

    }

    async signUp(email: string, password: string){
        const users = await this.userService.find(email);
        if( users.length > 0 ){
            throw new BadRequestException("Email already in use");
        }

        const hash = (await scrypt(password, salt, 32) as Buffer) ;
        const user = await this.userService.create(email, hash.toString());
        
        return user;
    }

    async signIn(email: string, password: string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException('No user found with the given email');
        }
        const hash = (await scrypt(password, salt, 32) as Buffer) ;
        if(user.password !== hash.toString()){
            throw new BadRequestException('Invalid password');
        }

        return user;

    }
}