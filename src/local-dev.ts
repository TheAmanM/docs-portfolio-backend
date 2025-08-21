// src/local-dev.ts
import app from "./api/index";

const port = 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
