import express from "express";

let app = require("./server/server").default;

if (module.hot) {
  module.hot.accept("./server/server", () => {
    console.log("🔁  HMR Reloading `./server/server`...");
    try {
      app = require("./server/server").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`App started on http://localhost:${port}`);
  })
  .on("error", (error) => {
    console.error(error);
  });
