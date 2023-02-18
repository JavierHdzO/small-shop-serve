import { IsString, Min } from 'class-validator';

export class GoogleRegisterDto {

    @IsString()
    clientId: string;

    @IsString()
    client_id: string;

    @IsString()
    @Min(20)
    credential: string;

    @IsString()
    select_by: string;

    @IsString()
    @Min(10)
    g_csrf_token: string;

}