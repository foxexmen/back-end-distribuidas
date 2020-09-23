"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// MODELAR LOS DATOS QUE TENDRA FACTURA
let facturaSchema = new mongoose_1.Schema({
    numFact: { type: String, required: [true, 'El numero de factura es necesario'] },
    descripcion: { type: String, required: false },
    producto: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cliente: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Cliente', required: true }
});
// EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO
exports.default = mongoose_1.model('Factura', facturaSchema);
