/* eslint-disable header/header */
const fs = require("fs-extra");
const glob = require("glob");

const gonzales = require("../gonzales-pe/lib/gonzales.js");

const files = glob.sync("**/*.scss", {
    ignore: ["node_modules/**"],
});
// console.log(files);
String.prototype.replaceAll = function (search, replacement) {
    const target = this;
    return target.replace(new RegExp(search, "g"), replacement);
};

const store = {};
async function process() {
    for (const file of files) {
        const f = await fs.readFile(file, "utf8");
        let content = f.toString();
        // console.log(content);
        const fixedFile = file.replace("packages/", "~@blueprintjs/");
        content = content.replaceAll("{$ns}", "bp4");
        store[fixedFile] = content;
        console.log("PARSING", fixedFile);
        // const parsed = gonzales.parse(content, { syntax: "scss" });
        // console.log("P:", parsed);
    }
    await fs.writeFile("./packages/docs-app/src/generatedStyles.ts", `export default ${JSON.stringify(store)} as any`);
    console.log("done");
}

process().catch(e => {
    console.error("error:", String(e));
});

// TODO find all sass/scss files!
// TODO parse each file
// TODO save file by file path
// TODO save all files to a single file
// TODO test

// const css = "a {color: tomato}";
// const parseTree = gonzales.parse(css);
// console.log(parseTree);
