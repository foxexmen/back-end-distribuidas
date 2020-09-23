import {Schema, model} from 'mongoose';

// MODELAR LOS DATOS QUE TENDRA FACTURA
let facturaSchema = new Schema(
    {
        numFact: {type: String, required:[true,'El numero de factura es necesario']},


        descripcion: {type:String, required: false},

        producto: {type: Schema.Types.ObjectId, ref: 'Producto', required: true},
        cliente: {type: Schema.Types.ObjectId, ref: 'Cliente', required: true}

    }
);

// EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO

export default model ('Factura', facturaSchema );

