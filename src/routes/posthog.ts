import { Router, Request, Response } from "express";
import fetch from "node-fetch";

const router = Router();

router.post(/(.*)/, async (req: Request, res: Response) => {
  // 1. Log the incoming request to see what you're receiving
  console.log(`[PROXY] Incoming request for: ${req.url}`);
  console.log(`[PROXY] Request body:`, JSON.stringify(req.body, null, 2));

  try {
    const posthogHost = "https://us.i.posthog.com";

    const response = await fetch(`${posthogHost}${req.url}`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });

    // 2. Log the response status from PostHog
    console.log(
      `[PROXY] Response from PostHog: ${response.status} ${response.statusText}`
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    // 3. Log any error that occurs during the fetch
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
