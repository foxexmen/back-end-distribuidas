"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// MODELAR LOS DATOS QUE TENDRA CATEGORIA
let categoriaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    }
});
// EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO
exports.default = mongoose_1.model('Categoria', categoriaSchema);
