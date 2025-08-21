import express from "express";
import cors from "cors";
import posthogRouter from "../routes/posthog";

const app = express();
const corsOptions = {
  origin: "https://amanmeherally.com",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/p", posthogRouter);

export default app;
