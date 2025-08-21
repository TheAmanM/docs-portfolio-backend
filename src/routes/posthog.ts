import { Router } from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

const router = Router();

const posthogHost = "https://us.i.posthog.com";

const posthogProxy = createProxyMiddleware({
  target: posthogHost,
  changeOrigin: true,
  on: {
    proxyReq: fixRequestBody,
  },
});

router.use("/", posthogProxy);

export default router;
