import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

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
                throw new BadRequestException('Correo utilizado para una cuenta');
            }

            const usuario = await this._dataBaseService.usuario.create({
                data: usuarioCrear,
            });

            return usuario;

        }catch(error){
            if(error instanceof BadRequestException){
                throw error;
            }
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
