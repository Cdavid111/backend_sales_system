import models from '../models/index';
import bcrypt from 'bcryptjs';

export default {
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
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
            const reg = await models.Usuario.findOne({ _id: req.query._id });
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
            const reg = await models.Usuario.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] }, { createdAt: 0 })
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
            
            //if there is crupy so it's not necesary again crypt , 
            let pas = req.body.password; //This user is in the form
            const reg0 = await models.Usuario.findOne({_id:req.body._id}); //This user there is in DB
            if (pas != reg0.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, {
                rol: req.body.rol,
                nombre: req.body.nombre,
                tipo_documento: req.body.tipo_documento,
                num_documento: req.body.num_documento,
                direccion: req.body.direccion,
                telefono : req.body.telefono,
                email: req.body.email,
                password : req.body.password

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
            const reg = await models.Usuario.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json({ 'state': 'The category was successfuly deleted' });
        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 }, { new: true });
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
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 }, { new: true });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'There is an error'
            });

            next(e);
        }
    },
    //This fucntion let do login in the system
    login: async (req,res,next) => {
        try {
            //verify that the user exist in the db
            let user = await models.Usuario.findOne({email:req.body.email});
            if(user){
                //The user exist with this email
                //Now let's go to look if the password is correct
                let match = await bcrypt.compare(req.body.password,user.password); //This return true or false
                if(match){
                    //if the user is connected ,then let's go to generate the code using JSONWEBTOKEN
                    //this code only belongs to the user
                }else{
                    res.status(404).send({
                        message:'The password does not correct'
                    })
                }


            }else{
                //The user do not exist
                res.status(404).send({
                    message:'The user does not exist'
                }); 
            }

        } catch (e) {
            
        }
    }
}