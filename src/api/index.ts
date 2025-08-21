import express from "express";
import cors from "cors";
import posthogRouter from "../routes/posthog";

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: "https://amanmeherally.com",
  credentials: true,
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/p", posthogRouter);

export default app;
