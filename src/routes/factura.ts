import { Router,Request,Response } from 'express';

// LLAMAR A LOS MODELOS CREADOS
import ProductoModel from '../models/producto'
import ClienteModel from '../models/categoria'
import FacturaModel from '../models/factura'



class Factura {
    router: Router;

    constructor() {
        this.router = Router();
        this.exponerRutas();
    }

    async getFactura(req: Request,res:Response){
        try
        {
            let facturaBD = await FacturaModel.find({}).sort('numFact').exec();
           

            ProductoModel.populate(facturaBD, {path: "producto", select:'nombre'});
           // ProductoModel.populate(productoBD, {path: "producto", select:'precioUni'});
            ClienteModel.populate(facturaBD, {path: "cliente", select:'nombre'});
            let conteo = await FacturaModel.countDocuments();

            res.json(
                {
                    facturas: facturaBD,
                    conteo: conteo
                });
        }
        catch (error)
        {
            return res.status(400).json(
                {
                    dato: error
                });
        }
    }


    async getFacturaId(req: Request,res:Response){
        try
        {
            let idurl = req.params.id;
            let facturaBD = await FacturaModel.findById(idurl);
            
            res.json(
                {
                    ok: true,
                    factura: facturaBD
                });
        }
        catch (error)
        {
            return res.status(400).json(
                {
                    ok: false,
                    dato: "Factura no encontrada",
                    message: error
                });
        }
    }

  

    async postFactura(req: Request, res:Response){
        try
        {
            let bodycabecera = req.body;
            console.log(req.body);
            
            
        let factura = new FacturaModel(
            {
                numFact: bodycabecera.numFact,
                descripcion: bodycabecera.descripcion,
                producto: bodycabecera.producto,
                cliente: bodycabecera.cliente,

            });

            let facturaBD = await factura.save();
            res.json(
                {
                    factura: facturaBD
                });
        }
        catch (error)
        {
            return res.status(500).json(
                {
                   dato: error
                });
        }
    }


    async putFactura(req: Request, res:Response){
        
        try
        {
            let idurl = req.params.id;
            let bodycabecera = req.body;

            let facturaBD = await FacturaModel.findByIdAndUpdate(idurl, bodycabecera,{ new: true, runValidators:true, context:'query'});
            res.json(
                {
                    factura: facturaBD
                });
            
        }
        catch (error)
        {
            return res.status(400).json(
                {
                   ok: "ERROR",
                   dato: error
                });
        }



    }

    async deleteFactura(req: Request, res:Response){
        try{
            let idurl = req.params.id;
            let facturaBD = await FacturaModel.findByIdAndRemove(idurl);

            res.json(
                {
                    mensaje: "FACTURA ELIMINADA",
                    factura: facturaBD
                });
        }
        catch (error){
            return res.status(400).json(
                {
                    message: "FACTURA NO ENCONTRADA",
                    dato:error
                });
        }
    }

        exponerRutas(){
            this.router.get('/', this.getFactura);
            this.router.get('/:id', this.getFacturaId);
            this.router.post('/', this.postFactura);
            this.router.put('/:id', this.putFactura);
            this.router.delete('/:id', this.deleteFactura);
            
        }
}

const factura = new Factura();
export default factura.router;