import { Request, Response, Router } from 'express';

import ClienteModel from '../models/cliente';

class Cliente {
    router: Router;
    constructor (){
        this.router = Router();
        this.exponerRutas();
    }

    async getCliente(req: Request, res: Response){
        try {
            let clienteBD = await ClienteModel.find({}).sort('nombre');
            let conteo = await ClienteModel.countDocuments();

            res.json(
                {
                    clientes: clienteBD,
                    conteo: conteo
                });
            
        } catch(error){
            return res.status(400).json(
                {
                    dato:error
                });
        }
    }

    
    async getClienteId(req: Request,res:Response){
        let clienteBD: any;
        try
        {
            let idurl = req.params.id;
            clienteBD = await ClienteModel.findById(idurl);
            clienteBD.usuario.password = null;
            
            res.json(
                {
                    ok: true,
                    cliente: clienteBD
                });
        }
        catch (error)
        {
            if(error){
                return res.status(400).json(
                    {
                        ok: false,
                        dato: "Cliente no encontrado",
                        message: error
                    });
            }
            
        }
    }
  

    async postCliente(req: any, res:Response){
        try
        {
            let bodycabecera = req.body;
            
            
            
        let cliente = new ClienteModel(
            {
                nombre: bodycabecera.nombre,
                apellido: bodycabecera.apellido,
                usuario: req.usuario

            });

            let clienteBD = await cliente.save();
            res.json(
                {
                    cliente: clienteBD
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


    async putCliente(req: Request, res:Response){
        
        try
        {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            console.log(idurl);
            console.log("-----------");
            console.log(bodycabecera);
            let clienteBD = await ClienteModel.findByIdAndUpdate(idurl, bodycabecera,{ new: true, runValidators:true, context:'query'});
            res.json(
                {
                    cliente: clienteBD
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

    async deleteCliente(req: Request, res:Response){
        let clienteBD: any;
        try{
            let idurl = req.params.id;
            let clienteBD = await ClienteModel.findByIdAndRemove(idurl);

            res.json(
                {
                    mensaje: "CLIENTE ELIMINADA",
                    cliente: clienteBD
                });  
        }
        catch (error){
            
            if(error){
                return res.status(400).json(
                    {
                        message: "CLIENTE ELIMINADA",
                        dato:error
                    });
            }else {
                if(clienteBD === null){
                    return res.status(400).json(
                        {
                            codigo:"400",
                            message:"CLIENTE NO ENCONTRADA"
                        }
                    )
                }
            }
            
        }
    }

        exponerRutas(){
            this.router.get('/', this.getCliente);
            this.router.get('/:id', this.getCliente);
            this.router.post('/', this.postCliente);
            this.router.put('/:id', this.putCliente);
            this.router.delete('/:id', this.deleteCliente);
            
        }


}


const cliente = new Cliente();
export default cliente.router;