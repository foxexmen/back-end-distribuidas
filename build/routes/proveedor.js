"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_1 = __importDefault(require("../models/proveedor"));
class Proveedor {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    async getProveedor(req, res) {
        try {
            let proveedorBD = await proveedor_1.default.find({}).sort('nombre');
            let conteo = await proveedor_1.default.countDocuments();
            res.json({
                proveedors: proveedorBD,
                conteo: conteo
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async getProveedorId(req, res) {
        let proveedorBD;
        try {
            let idurl = req.params.id;
            proveedorBD = await proveedor_1.default.findById(idurl);
            proveedorBD.usuario.password = null;
            res.json({
                ok: true,
                proveedor: proveedorBD
            });
        }
        catch (error) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    dato: "Proveedor no encontrado",
                    message: error
                });
            }
        }
    }
    async postProveedor(req, res) {
        try {
            let bodycabecera = req.body;
            let proveedor = new proveedor_1.default({
                nombre: bodycabecera.nombre,
                usuario: req.usuario
            });
            let proveedorBD = await proveedor.save();
            res.json({
                proveedor: proveedorBD
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async putProveedor(req, res) {
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            console.log(idurl);
            console.log("-----------");
            console.log(bodycabecera);
            let proveedorBD = await proveedor_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
            res.json({
                proveedor: proveedorBD
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: "ERROR",
                dato: error
            });
        }
    }
    async deleteProveedor(req, res) {
        let proveedorBD;
        try {
            let idurl = req.params.id;
            let proveedorBD = await proveedor_1.default.findByIdAndRemove(idurl);
            res.json({
                mensaje: "PROVEEDOR ELIMINADO",
                producto: proveedorBD
            });
        }
        catch (error) {
            if (error) {
                return res.status(400).json({
                    message: "PROVEEDOR ELIMINADO",
                    dato: error
                });
            }
            else {
                if (proveedorBD === null) {
                    return res.status(400).json({
                        codigo: "400",
                        message: "PROVEEDOR NO ENCONTRADO"
                    });
                }
            }
        }
    }
    exponerRutas() {
        this.router.get('/', this.getProveedor);
        this.router.get('/:id', this.getProveedor);
        this.router.post('/', this.postProveedor);
        this.router.put('/:id', this.putProveedor);
        this.router.delete('/:id', this.deleteProveedor);
    }
}
const proveedor = new Proveedor();
exports.default = proveedor.router;
