import {ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from 'class-validator';

export class FindGameDto {
    @IsNotEmpty()
    @IsString()
    public id: string
}