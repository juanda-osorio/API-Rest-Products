import { Schema, model } from 'mongoose';

const esquemaProducto = new Schema({
    nombre: String,
    categoria: String,
    descripcion: String,
    precio: Number,
    imgURL: String

}, {
    timestamps: true, //cada vez que se guarde un nuevo dato va con fecha creación y actualizacion
    versionKey: false //cada vez que se guarde un nuevo dato no aparezca el __v
});

export default model('productos', esquemaProducto);