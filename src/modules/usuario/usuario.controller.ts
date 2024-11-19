import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { log } from 'console';
import { MessagePattern } from '@nestjs/microservices';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ){}

    //@Post('crear-cuenta')
    @MessagePattern({cmd: 'create_user'})
    public crearCuenta(@Body() usuario: CreateUsuarioDto){
        return this._usuarioService.crearUsuario(usuario);
    }

}
