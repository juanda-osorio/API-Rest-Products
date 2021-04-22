//ESTE FICHERO DE CONTROLLER ES COMO EL 'NEGOCIO' DEL CURSO, LA LOGICA DE NEGOCIO,
//pero aqui se reciben req, res y no debería; solo deberían tratarse promesas.

//OJO con esta importación: si pongo las llaves es porque existen los modulos o funciones
//si no pongo las llaves, es porque defino así la variable
import Producto from './../models/Product.model';
export const createProduct = async(req, res) => {

    const { nombre, categoria, descripcion, precio, imgURL } = req.body;

    const newProduct = new Producto({ nombre, categoria, descripcion, precio, imgURL });

    const productoGuardado = await newProduct.save();

    //201 recurso guardado
    res.status(201).json(productoGuardado);

};

export const getProducts = async(req, res) => {
    const productos = await Producto.find();
    res.json(productos);
};

export const getProductById = async(req, res) => {
    const productId = req.params.productId;
    let productoBuscado = await Producto.findById(productId);
    res.status(200).json(productoBuscado);
};

export const updateProductById = async(req, res) => {
    const productId = req.params.productId;
    const productoModificar = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(productId, productoModificar, { new: true });
    res.status(200).json(productoActualizado);
};

export const deleteProductById = async(req, res) => {
    const productId = req.params.productId;
    await Producto.findByIdAndDelete(productId);
    res.status(204).json();
};