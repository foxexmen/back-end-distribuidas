"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// MODELAR LOS DATOS QUE TENDRA PRODUCTO
let productoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio unitario es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    proveedor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Proveedor', required: true }
});
// EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO
exports.default = mongoose_1.model('Producto', productoSchema);
