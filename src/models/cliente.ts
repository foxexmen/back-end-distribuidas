import {Schema, model} from 'mongoose';

// MODELAR LOS DATOS QUE TENDRA CLIENTE
let clienteSchema = new Schema(
    {
        nombre: {type: String, required:[true,'Nombre es Obligatorio']},
        apellido: {type: String, required:[true,'Apellido es Obligatorio']}
        

        
    });

// EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO

export default model ('Cliente',clienteSchema );

