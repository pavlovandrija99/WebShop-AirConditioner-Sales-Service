import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/database.js";
import airConditionerTypeRoutes from "./routes/airConditionerTypeRoutes.js";
import airConditionerRoutes from "./routes/airConditionerRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceTypeRoutes from "./routes/serviceTypeRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { getAllAirConditioners} from "./controllers/airConditionerController.js"

dotenv.config();

connectDatabase();

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/airConditionerTypes", airConditionerTypeRoutes);
app.use("/api/airConditioners/all", getAllAirConditioners);
app.use("/api/airConditioners", airConditionerRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/serviceTypes", serviceTypeRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orderItems", orderItemRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/", (req, res) => {
  res.send("Backend server is running...!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT || 5000,
  console.log(`Server running on port ${process.env.PORT}`)
);
