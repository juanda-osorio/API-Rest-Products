//ESTE FICHERO DE RUTAS ES COMO EL 'REST' DEL CURSO, LA LOGICA DE CONTROL.
//Aqui faltarían funciones que reciban: req, res para que sea la LC de verdad.

import { Router } from 'express';
import * as productsCtrl from './../controllers/products.controller';
import { authJwt } from "./../middlewares";

const router = Router();


router.post("/", [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct);

router.get("/", productsCtrl.getProducts);

router.get("/:productId", productsCtrl.getProductById);

router.put("/:productId", [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById);

router.delete("/:productId", [authJwt.verifyToken, authJwt.isModerator], productsCtrl.deleteProductById);


export default router;