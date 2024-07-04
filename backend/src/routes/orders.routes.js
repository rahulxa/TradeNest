import { Router } from "express";
import { placeOrder, getUserOrders } from "../controllers/order.controller";
import { verifyJWT } from "../middlewares/auth.middleware";


const orderRouter = Router();

orderRouter.route("/place-order").post(verifyJWT, placeOrder);
orderRouter.route("/get-orders").get(verifyJWT, getUserOrders)


export default orderRouter