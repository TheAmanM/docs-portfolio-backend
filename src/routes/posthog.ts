import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post(/(.*)/, async (req, res) => {
  try {
    const posthogHost = "https://us.i.posthog.com";

    const response = await fetch(`${posthogHost}${req.url}`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error forwarding request to PostHog",
    });
  }
});

export default router;
