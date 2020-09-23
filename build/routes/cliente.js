"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = __importDefault(require("../models/cliente"));
class Cliente {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    async getCliente(req, res) {
        try {
            let clienteBD = await cliente_1.default.find({}).sort('nombre');
            let conteo = await cliente_1.default.countDocuments();
            res.json({
                clientes: clienteBD,
                conteo: conteo
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async getClienteId(req, res) {
        let clienteBD;
        try {
            let idurl = req.params.id;
            clienteBD = await cliente_1.default.findById(idurl);
            clienteBD.usuario.password = null;
            res.json({
                ok: true,
                cliente: clienteBD
            });
        }
        catch (error) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    dato: "Cliente no encontrado",
                    message: error
                });
            }
        }
    }
    async postCliente(req, res) {
        try {
            let bodycabecera = req.body;
            let cliente = new cliente_1.default({
                nombre: bodycabecera.nombre,
                apellido: bodycabecera.apellido,
                usuario: req.usuario
            });
            let clienteBD = await cliente.save();
            res.json({
                cliente: clienteBD
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async putCliente(req, res) {
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            console.log(idurl);
            console.log("-----------");
            console.log(bodycabecera);
            let clienteBD = await cliente_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
            res.json({
                cliente: clienteBD
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: "ERROR",
                dato: error
            });
        }
    }
    async deleteCliente(req, res) {
        let clienteBD;
        try {
            let idurl = req.params.id;
            let clienteBD = await cliente_1.default.findByIdAndRemove(idurl);
            res.json({
                mensaje: "CLIENTE ELIMINADA",
                cliente: clienteBD
            });
        }
        catch (error) {
            if (error) {
                return res.status(400).json({
                    message: "CLIENTE ELIMINADA",
                    dato: error
                });
            }
            else {
                if (clienteBD === null) {
                    return res.status(400).json({
                        codigo: "400",
                        message: "CLIENTE NO ENCONTRADA"
                    });
                }
            }
        }
    }
    exponerRutas() {
        this.router.get('/', this.getCliente);
        this.router.get('/:id', this.getCliente);
        this.router.post('/', this.postCliente);
        this.router.put('/:id', this.putCliente);
        this.router.delete('/:id', this.deleteCliente);
    }
}
const cliente = new Cliente();
exports.default = cliente.router;
