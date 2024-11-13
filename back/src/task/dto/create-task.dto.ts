import { IsNotEmpty, IsString } from "class-validator"

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    titulo: string

    @IsString()
    @IsNotEmpty()
    descripcion: string

}
