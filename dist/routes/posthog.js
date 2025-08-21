"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = (0, express_1.Router)();
router.post("/*", async (req, res) => {
    try {
        const posthogHost = "https://us.i.posthog.com";
        const response = await (0, node_fetch_1.default)(`${posthogHost}${req.url}`, {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        res.status(response.status).json(data);
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error forwarding request to PostHog",
        });
    }
});
exports.default = router;
//# sourceMappingURL=posthog.js.map