import { Request, Response, Router } from 'express';

import ProveedorModel from '../models/proveedor';

class Proveedor {
    router: Router;
    constructor (){
        this.router = Router();
        this.exponerRutas();
    }

    async getProveedor(req: Request, res: Response){
        try {
            let proveedorBD = await ProveedorModel.find({}).sort('nombre');
            let conteo = await ProveedorModel.countDocuments();

            res.json(
                {
                    proveedors: proveedorBD,
                    conteo: conteo
                });
            
        } catch(error){
            return res.status(400).json(
                {
                    dato:error
                });
        }
    }

    
    async getProveedorId(req: Request,res:Response){
        let proveedorBD: any;
        try
        {
            let idurl = req.params.id;
            proveedorBD = await ProveedorModel.findById(idurl);
            proveedorBD.usuario.password = null;
            
            res.json(
                {
                    ok: true,
                    proveedor: proveedorBD
                });
        }
        catch (error)
        {
            if(error){
                return res.status(400).json(
                    {
                        ok: false,
                        dato: "Proveedor no encontrado",
                        message: error
                    });
            }
            
        }
    }
  

    async postProveedor(req: any, res:Response){
        try
        {
            let bodycabecera = req.body;
            
            
            
        let proveedor = new ProveedorModel(
            {
                nombre: bodycabecera.nombre,
                usuario: req.usuario

            });

            let proveedorBD = await proveedor.save();
            res.json(
                {
                    proveedor: proveedorBD
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


    async putProveedor(req: Request, res:Response){
        
        try
        {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            console.log(idurl);
            console.log("-----------");
            console.log(bodycabecera);
            let proveedorBD = await ProveedorModel.findByIdAndUpdate(idurl, bodycabecera,{ new: true, runValidators:true, context:'query'});
            res.json(
                {
                    proveedor: proveedorBD
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

    async deleteProveedor(req: Request, res:Response){
        let proveedorBD: any;
        try{
            let idurl = req.params.id;
            let proveedorBD = await ProveedorModel.findByIdAndRemove(idurl);

            res.json(
                {
                    mensaje: "PROVEEDOR ELIMINADO",
                    producto: proveedorBD
                });  
        }
        catch (error){
            
            if(error){
                return res.status(400).json(
                    {
                        message: "PROVEEDOR ELIMINADO",
                        dato:error
                    });
            }else {
                if(proveedorBD === null){
                    return res.status(400).json(
                        {
                            codigo:"400",
                            message:"PROVEEDOR NO ENCONTRADO"
                        }
                    )
                }
            }
            
        }
    }

        exponerRutas(){
            this.router.get('/', this.getProveedor);
            this.router.get('/:id', this.getProveedor);
            this.router.post('/', this.postProveedor);
            this.router.put('/:id', this.putProveedor);
            this.router.delete('/:id', this.deleteProveedor);
            
        }


}


const proveedor = new Proveedor();
export default proveedor.router;