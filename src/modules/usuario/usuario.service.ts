import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsuarioService {

    private readonly logger = new Logger('RegisterService')
    constructor(
        private readonly _dataBaseService: DatabaseService
    ){
        this.logger.log('Conectado a la base de datos');
    }

    public async crearUsuario(usuarioCrear: CreateUsuarioDto){
        try {
            if(await this.existUsuario(usuarioCrear.correo)){
                throw new RpcException({
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Correo utilizado para una cuenta'});
            }

            const usuario = await this._dataBaseService.usuario.create({
                data: usuarioCrear,
            });

            return usuario;

        }catch(error){
            if(error instanceof RpcException){
                throw error;
            }

            throw new RpcException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error interno al crear usuario en el microservicio register'
            })
        }
    }

    public async existUsuario(correo: string){
        const existeUsuario = await this._dataBaseService.usuario.findFirst({
            where: {
                correo: correo,
            }
        });


        if(existeUsuario!){
            return false;
        }
        return true;
    }
}
