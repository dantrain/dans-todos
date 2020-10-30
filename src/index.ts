import express from "express";

let app = require("./server/main").default;

if (module.hot) {
  module.hot.accept("./server/main", () => {
    console.log("🔁  HMR Reloading `./server/main`...");
    try {
      app = require("./server/main").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(process.env.PORT, () => {
    console.log(`App started on http://localhost:${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.error(error);
  });
