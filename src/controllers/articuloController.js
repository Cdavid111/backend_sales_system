import models from '../models/index';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Articulo.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Articulo.findOne({ _id: req.query._id })
            .populate('categoria', { nombre: 1 });

            if (!reg) {
                res.status(404).send({
                    message: 'No found it'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Articulo.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'descripcion': new RegExp(valor, 'i') }] }, { createdAt: 0 })
                .populate('categoria', { nombre: 1 })
                .sort({ 'createdAt': -1 });

            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({ _id: req.body._id }, {
                categoria:req.body.categoria,
                codigo: req.body.codigo,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio_venta : req.body.precio_venta,
                stock: req.body.stock
            }, { new: true });

            res.status(200).json(reg);

        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndRemove({ _id: req.body._id });
            res.status(200).json({ 'state': 'The article was successfully deleted' });
        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 }, { new: true });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 }, { new: true });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    }
}