import {Schema, model} from 'mongoose';

// MODELAR LOS DATOS QUE TENDRA CATEGORIA
let categoriaSchema = new Schema(
    {
        nombre: {
            type: String, 
            required:[true,'Nombre es Obligatorio']
        }

        
    });

// EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO

export default model ('Categoria',categoriaSchema );

