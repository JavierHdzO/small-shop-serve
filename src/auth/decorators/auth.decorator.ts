import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roles: Role[]) {

    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards( JwtAuthGuard, RolesGuard ),
    );
}