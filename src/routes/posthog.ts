import { Router, Request, Response } from "express";
import fetch from "node-fetch";

const router = Router();

router.post(/(.*)/, async (req: Request, res: Response) => {
  try {
    const posthogHost = "https://us.i.posthog.com";

    // --- Start of Fix ---
    // Prepare headers for the forwarded request.
    // We'll copy most headers from the original request.
    const forwardedHeaders = { ...req.headers };

    // Remove headers that are specific to the incoming connection
    // and should not be forwarded.
    delete forwardedHeaders.host;
    delete forwardedHeaders["content-length"];
    // Add any other headers you want to explicitly exclude

    // Ensure Content-Type is set correctly
    forwardedHeaders["Content-Type"] = "application/json";
    // --- End of Fix ---

    const response = await fetch(`${posthogHost}${req.url}`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: forwardedHeaders as { [key: string]: string }, // Pass the cleaned headers
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = await response.text();
    }

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
