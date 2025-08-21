import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
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

// Index file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// PostHog routes
app.use("/p", posthogRouter);

export default app;
