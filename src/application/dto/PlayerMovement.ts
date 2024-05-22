import {ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from 'class-validator';

export class PlayerMovement {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(2)
    public x: number;
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(2)
    public y: number
}