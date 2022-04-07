/* eslint-disable header/header */
const gonzales = require("../gonzales-pe/lib/gonzales.js");

const css = `
.booo {
    font: $boo;
}
`;
// const css = `
// $font-stack: Helvetica, sans-serif;
// $blob: $font-stack;
// `;

const parsed = gonzales.parse(css, { syntax: "scss" });

function getUniqueChild(node, type) {
    const found = node.content.filter(n => n.type === type);
    if (found.length === 0) {
        throw new Error("Child not found: " + type);
    }
    if (found.length > 1) {
        throw new Error("Found too many children of type: " + type);
    }
    return found[0];
}

function findDependencies(node) {
    const foundVars = {};
    function traverseNodes(node) {
        if (node.type === "variable") {
            const ident = getUniqueChild(node, "ident");
            foundVars[ident.content] = true;
        }
        if (Array.isArray(node.content)) {
            node.content.forEach(child => {
                traverseNodes(child);
            });
        }
    }
    traverseNodes(node);

    return foundVars;
}

// find all variable definitions
const allVars = {};
const allRulesets = {};
if (parsed.type === "stylesheet") {
    parsed.content.forEach(subNode => {
        if (subNode.type === "declaration") {
            const prop = getUniqueChild(subNode, "property");
            const val = getUniqueChild(subNode, "value");
            const variable = getUniqueChild(prop, "variable");

            const identifier = getUniqueChild(variable, "ident");
            const dependencies = findDependencies(val);
            allVars[identifier.content] = { string: val.toString(), dependencies };
        }
        if (subNode.type === "ruleset") {
            const selector = getUniqueChild(subNode, "selector");
            const block = getUniqueChild(subNode, "block");
            const dependencies = findDependencies(block);
            allRulesets[selector.toString()] = { string: block.toString(), dependencies };
        }
    });
}
console.log(allRulesets);
console.log(allVars);
