import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "roles",
        type: Schema.Types.ObjectId
            /*con esto accedo a los id's de la coleccion 'roles' y la relaciono con
             * el esquema de 'User'*/
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async(password) => {
    //veces que codifica una contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(`${password}`, salt);
    return hashedPw;
}

userSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(`${password}`, receivedPassword);
}

export default model("usuarios", userSchema);