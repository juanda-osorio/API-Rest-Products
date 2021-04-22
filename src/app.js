import express from 'express';
import morgan from 'morgan';
import pkg from './../package.json';
import productRoutes from './routes/products.routes';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { createRoles } from "./libs/initialSetup";

const app = express();
//ejecuta esta función que crea 3 roles al inicio de la aplicación
createRoles();

app.set("pkg", pkg);
app.use(morgan('tiny'));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        author: app.get("pkg").author,
        name: app.get("pkg").name,
        description: app.get("pkg").description,
        version: app.get("pkg").version
    });
});

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default app;