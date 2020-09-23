"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// LLAMAR A LOS MODELOS CREADOS
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
const factura_1 = __importDefault(require("../models/factura"));
class Factura {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    async getFactura(req, res) {
        try {
            let facturaBD = await factura_1.default.find({}).sort('numFact').exec();
            producto_1.default.populate(facturaBD, { path: "producto", select: 'nombre' });
            // ProductoModel.populate(productoBD, {path: "producto", select:'precioUni'});
            categoria_1.default.populate(facturaBD, { path: "cliente", select: 'nombre' });
            let conteo = await factura_1.default.countDocuments();
            res.json({
                facturas: facturaBD,
                conteo: conteo
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async getFacturaId(req, res) {
        try {
            let idurl = req.params.id;
            let facturaBD = await factura_1.default.findById(idurl);
            res.json({
                ok: true,
                factura: facturaBD
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: false,
                dato: "Factura no encontrada",
                message: error
            });
        }
    }
    async postFactura(req, res) {
        try {
            let bodycabecera = req.body;
            console.log(req.body);
            let factura = new factura_1.default({
                numFact: bodycabecera.numFact,
                descripcion: bodycabecera.descripcion,
                producto: bodycabecera.producto,
                cliente: bodycabecera.cliente,
            });
            let facturaBD = await factura.save();
            res.json({
                factura: facturaBD
            });
        }
        catch (error) {
            return res.status(500).json({
                dato: error
            });
        }
    }
    async putFactura(req, res) {
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            let facturaBD = await factura_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
            res.json({
                factura: facturaBD
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: "ERROR",
                dato: error
            });
        }
    }
    async deleteFactura(req, res) {
        try {
            let idurl = req.params.id;
            let facturaBD = await factura_1.default.findByIdAndRemove(idurl);
            res.json({
                mensaje: "FACTURA ELIMINADA",
                factura: facturaBD
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "FACTURA NO ENCONTRADA",
                dato: error
            });
        }
    }
    exponerRutas() {
        this.router.get('/', this.getFactura);
        this.router.get('/:id', this.getFacturaId);
        this.router.post('/', this.postFactura);
        this.router.put('/:id', this.putFactura);
        this.router.delete('/:id', this.deleteFactura);
    }
}
const factura = new Factura();
exports.default = factura.router;
