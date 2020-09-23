"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//LLAMAR AL MODULO EXPRESS
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//LLAMAR A LAS RUTAS DEL SERVIDOR
const producto_1 = __importDefault(require("./routes/producto"));
const categoria_1 = __importDefault(require("./routes/categoria"));
const proveedor_1 = __importDefault(require("./routes/proveedor"));
const cliente_1 = __importDefault(require("./routes/cliente"));
const factura_1 = __importDefault(require("./routes/factura"));
//CLASE
class Server {
    constructor() {
        //INICIALIZAR AL MODULO EXPRESS
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //INICIALIZAR EL PUERTO DE EXPRESS
        this.app.set('port', process.env.PORT || 4000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO
        this.app.use(morgan_1.default('dev'));
        // PROTECCION DEL BACKEND
        this.app.use(helmet_1.default());
        //CONEXION A LA BDD
        const MONGO_URI = 'mongodb+srv://foxexz:ajVDgQmWwVzH4FbY@cluster0.mjkad.mongodb.net/tienda?retryWrites=true&w=majority';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD OK");
        });
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        //RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categoria_1.default);
        this.app.use('/api/proveedor', proveedor_1.default);
        this.app.use('/api/cliente', cliente_1.default);
        this.app.use('/api/factura', factura_1.default);
    }
    start() {
        //INICIALIZAR EL SERVIDOR EXPRESS
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO");
        });
    }
}
//INICIAR LA CLASE
const server = new Server();
server.start();
