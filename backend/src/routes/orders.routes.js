import { Router } from "express";
import { placeOrder, getUserOrders } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const orderRouter = Router();

orderRouter.route("/place-order").post(verifyJWT, placeOrder);
orderRouter.route("/get-orders").get(verifyJWT, getUserOrders)


export default orderRouter;