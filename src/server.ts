//LLAMAR AL MODULO EXPRESS
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

//LLAMAR A LAS RUTAS DEL SERVIDOR
import producto from './routes/producto';
import categoria from './routes/categoria';
import proveedor from './routes/proveedor';
import cliente from './routes/cliente';
import factura from './routes/factura';

//CLASE
class Server
{
    //ESPECIFICAR EL TIPO DE DATO PARA LA VARIABLE APP
    public app: express.Application;
    constructor()
    {
        //INICIALIZAR AL MODULO EXPRESS
        this.app = express();
        this.config();
        this.routes();
    }
    config(){
        //INICIALIZAR EL PUERTO DE EXPRESS
        this.app.set('port', process.env.PORT || 4000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO
        this.app.use(morgan('dev'));
        // PROTECCION DEL BACKEND
        this.app.use(helmet());
        //CONEXION A LA BDD
        const MONGO_URI = 'mongodb+srv://foxexz:ajVDgQmWwVzH4FbY@cluster0.mjkad.mongodb.net/tienda?retryWrites=true&w=majority'
        mongoose.connect(MONGO_URI,{ useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true}).then(()=>{
            console.log("BDD OK");
        });
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors());
        //RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express.urlencoded({extended:false}));
    }
    routes(){
        this.app.use('/api/producto',producto);
        this.app.use('/api/categoria',categoria);
        this.app.use('/api/proveedor',proveedor);
        this.app.use('/api/cliente',cliente);
        this.app.use('/api/factura',factura);
    }
    start(){
        //INICIALIZAR EL SERVIDOR EXPRESS
        this.app.listen(this.app.get('port'), ()=>{
            console.log("SERVIDOR FUNCIONANDO");
        });
    }
}

//INICIAR LA CLASE
const server = new Server();
server.start();