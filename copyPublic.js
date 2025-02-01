const fs = require("fs-extra");

fs.copySync("public", "dist/public", { overwrite: true });

console.log("📂 Archivos copiados de public a dist.");
