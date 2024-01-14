import { ExecutionContext, createParamDecorator } from "@nestjs/common"

export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        // const session = request.session;
        console.log(request.session.userId);
        
        return request.currentUser;
    }
)