import express from "express";
import jphRoutes from "./jph-routes.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use("/jph", jphRoutes);
app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
