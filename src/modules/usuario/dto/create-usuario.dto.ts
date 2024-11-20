import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {

    nombre: string;

    correo: string;

    password: string;
    
}