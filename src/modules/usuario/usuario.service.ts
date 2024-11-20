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

    public async crearUsuario(usuarioCrear: CreateUsuarioDto) {
        try {
          // Crear el nuevo usuario sin verificación de correo duplicado
          const nuevoUsuario = await this._dataBaseService.usuario.create({
            data: usuarioCrear,
          });
      
          return nuevoUsuario;
        } catch (error) {
          // Eliminar la parte de verificación del correo
          throw new RpcException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Error interno al crear el usuario',
          });
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
