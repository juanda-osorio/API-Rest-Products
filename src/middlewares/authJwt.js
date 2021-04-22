import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import User from "../models/User";

export const verifyToken = async(req, res, next) => {

    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        const tokenDecoded = await jwt.verify(token, config.SECRET);
        // agrego al objeto request el id del usuario que he decodeado
        // para que el resto de funciones puedan acceder a él
        req.userId = tokenDecoded.id;

        const user = await User.findById(tokenDecoded.id, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

};


export const isModerator = async(req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    const roles = await Role.find({ _id: { $in: user.roles } });
    console.log(roles);
    for (const rol of roles) {
        if (rol.name === "moderator") {
            next();
            return; //return para que en cuanto lo encuentre salga del bucle
        }
    }
    return res.status(403).json({ message: "Require Moderator Role" });
};


export const isAdmin = async(req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    const roles = await Role.find({ _id: { $in: user.roles } });
    console.log(roles);
    for (const rol of roles) {
        if (rol.name === "admin") {
            next();
            return; //return para que en cuanto lo encuentre salga del bucle
        }
    }
    return res.status(403).json({ message: "Require Admin Role" });
}