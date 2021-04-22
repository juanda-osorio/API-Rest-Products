import User from "./../models/User";
import jwt from "jsonwebtoken";
import config from "./../config";
import Role from "../models/Role";


export const register = async(req, res) => {

    const { username, email, password, roles } = req.body;

    //* validar si ya existe antes de crearlo en la carpeta 'libs'

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = role._id;
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = await jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 60 * 60 * 24
    });

    res.status(200).json({ token: token });
};




export const login = async(req, res) => {
    //'Populate': lo unico que hace es agregarle a la respuesta todos los atributos 
    //             que tenga la colección de roles
    //'roles': es la referencia que pusimos en el modelo y es como se llama 
    //          la colección de roles definida en el modelo Rol.
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");
    if (!userFound) {
        return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) {
        return res.status(401).json({ token: null, message: "Invalid Password" });
    }

    const token = await jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 60 * 60 * 24
    })
    res.json({ token });

};