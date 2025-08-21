import { Router, Request, Response } from "express";
import fetch from "node-fetch";

const router = Router();

router.post(/(.*)/, async (req: Request, res: Response) => {
  try {
    const posthogHost = "https://us.i.posthog.com";

    const response = await fetch(`${posthogHost}${req.url}`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });

    // --- Start of Fix ---
    // Try to parse the response as JSON.
    // If it fails, it's likely plain text, so handle that.
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = await response.text();
    }
    // --- End of Fix ---

    res.status(response.status).send(data);
  } catch (error) {
    console.error("[PROXY] Error forwarding request:", error);
    res.status(500).json({
      status: "error",
      message: "Error forwarding request to PostHog",
    });
  }
});

// Your existing GET route for testing
router.get(/(.*)/, async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "PostHog proxy is running",
  });
});

export default router;
