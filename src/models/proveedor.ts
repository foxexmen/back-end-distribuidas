import {Schema, model} from 'mongoose';

// MODELAR LOS DATOS QUE TENDRA PROVEEDOR
let proveedorSchema = new Schema(
    {
        nombre: {type: String, required:[true,'Nombre del proveedor es Obligatorio']}

        
    });

// EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO

export default model ('Proveedor',proveedorSchema );

