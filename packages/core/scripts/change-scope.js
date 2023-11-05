const fs = require("fs");

const file = fs.readFileSync("./package.json", {
    encoding: "utf-8",
});

const json = JSON.parse(file);

json.name = "@dhampir/core";

fs.writeFileSync("./package.json", JSON.stringify(json, undefined, 2));
