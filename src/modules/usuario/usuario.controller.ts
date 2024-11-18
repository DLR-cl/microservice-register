import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { log } from 'console';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ){}

    @Post('crear-cuenta')
    public crearCuenta(@Body() usuario: CreateUsuarioDto){
        return this._usuarioService.crearUsuario(usuario);
    }

    @Post('login')
    public login(@Body() login: LoginUsuarioDto){
        return this._usuarioService.loginUsuario(login);
    }
}
