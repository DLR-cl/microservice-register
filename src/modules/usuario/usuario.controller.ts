import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { log } from 'console';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ){}

    //@Post('crear-cuenta')
    @MessagePattern({ cmd: 'crear' })
    public crearCuenta(@Body() usuario: CreateUsuarioDto){
        return this._usuarioService.crearUsuario(usuario);
    }
}
