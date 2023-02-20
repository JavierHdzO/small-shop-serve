import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
    (data: string, context: ExecutionContext) => {

        const { user } =  context.switchToHttp().getRequest();
        
        if(!user) throw new InternalServerErrorException('User not found');

        return data? user?.[data] : user;
    },
);