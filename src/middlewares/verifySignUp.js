import User from "../models/User";
import { ROLES } from "./../models/Role";

export const checkDuplicatedUsernameEmail = async(req, res, next) => {

    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ message: "User already exists!" });

    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).json({ message: "Email already exists!" });
    next();
}

export const checkRolesExists = (req, res, next) => {
    if (req.body.roles) {
        for (const rol of req.body.roles) {
            if (!ROLES.includes(rol)) {
                return res.status(400).json({ message: `Role '${rol}' doesn't exists!` });
            }
        }
    }
    next();
};