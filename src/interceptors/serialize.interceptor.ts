import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto: any){

    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
       // run before a request is handled
    //    console.log("Before a request is handled", context);
       
       return next.handle().pipe(
        map((data: any) => {
            // run before the response is sent out
            // console.log("before the response is sent out", data);
            return plainToClass(this.dto, data, {
                excludeExtraneousValues: true,
            })
        })
       );
        
    }
}