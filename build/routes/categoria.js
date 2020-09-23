"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_1 = __importDefault(require("../models/categoria"));
class Categoria {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    async getCategoria(req, res) {
        try {
            let categoriaBD = await categoria_1.default.find({}).sort('nombre');
            let conteo = await categoria_1.default.countDocuments();
            res.json({
                categorias: categoriaBD,
                conteo: conteo
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async getCategoriaId(req, res) {
        let categoriaBD;
        try {
            let idurl = req.params.id;
            categoriaBD = await categoria_1.default.findById(idurl);
            categoriaBD.usuario.password = null;
            res.json({
                ok: true,
                categoria: categoriaBD
            });
        }
        catch (error) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    dato: "Categoria no encontrado",
                    message: error
                });
            }
        }
    }
    async postCategoria(req, res) {
        try {
            let bodycabecera = req.body;
            let categoria = new categoria_1.default({
                nombre: bodycabecera.nombre,
                usuario: req.usuario
            });
            let categoriaBD = await categoria.save();
            res.json({
                categoria: categoriaBD
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async putCategoria(req, res) {
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            console.log(idurl);
            console.log("-----------");
            console.log(bodycabecera);
            let categoriaBD = await categoria_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
            res.json({
                categoria: categoriaBD
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: "ERROR",
                dato: error
            });
        }
    }
    async deleteCategoria(req, res) {
        let categoriaBD;
        try {
            let idurl = req.params.id;
            let categoriaBD = await categoria_1.default.findByIdAndRemove(idurl);
            res.json({
                mensaje: "CATEGORIA ELIMINADA",
                categoria: categoriaBD
            });
        }
        catch (error) {
            if (error) {
                return res.status(400).json({
                    message: "CATEGORIA ELIMINADA",
                    dato: error
                });
            }
            else {
                if (categoriaBD === null) {
                    return res.status(400).json({
                        codigo: "400",
                        message: "CATEGORIA NO ENCONTRADA"
                    });
                }
            }
        }
    }
    exponerRutas() {
        this.router.get('/', this.getCategoria);
        this.router.get('/:id', this.getCategoria);
        this.router.post('/', this.postCategoria);
        this.router.put('/:id', this.putCategoria);
        this.router.delete('/:id', this.deleteCategoria);
    }
}
const categoria = new Categoria();
exports.default = categoria.router;
