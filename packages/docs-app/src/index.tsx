/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
// eslint-disable-next-line import/order
// import resolve from "resolve-path";

// import sass from "sass";
// @ts-ignore
import Sass from "sass.js/dist/sass.js";

import { docsData } from "@blueprintjs/docs-data";
import { createDefaultRenderers, ReactDocsTagRenderer, ReactExampleTagRenderer } from "@blueprintjs/docs-theme";

import { BlueprintDocs } from "./components/blueprintDocs";
import data from "./generatedStyles";
import * as ReactDocs from "./tags/reactDocs";
import { reactExamples } from "./tags/reactExamples";

function absolute(base: any, relative: any) {
    const stack = base.split("/");
    const parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
    // (omit if "base" is the current folder without trailing slash)
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == ".") continue;
        if (parts[i] == "..") stack.pop();
        else stack.push(parts[i]);
    }
    return stack.join("/");
}

Sass.setWorkerUrl("/assets/sass.worker.js");
// @ts-ignore
// process.stdout = {};
const sass = new Sass();

const reactDocs = new ReactDocsTagRenderer(ReactDocs as any);
const reactExample = new ReactExampleTagRenderer(reactExamples);

const tagRenderers = {
    ...createDefaultRenderers(),
    reactDocs: reactDocs.render,
    reactExample: reactExample.render,
};
sass.importer((request: any, done: any) => {
    // (object) request
    // (string) request.current path libsass wants to load (content of »@import "<path>";«)
    // (string) request.previous absolute path of previously imported file ("stdin" if first)
    // (string) request.resolved currentPath resolved against previousPath
    // (string) request.path absolute path in file system, null if not found
    // (mixed)  request.options the value of options.importer
    // -------------------------------
    // (object) result
    // (string) result.path the absolute path to load from file system
    // (string) result.content the content to use instead of loading a file
    // (string) result.error the error message to print and abort the compilation
    // asynchronous callback

    if (
        request.current === "~normalize.css/normalize.css" ||
        request.current === "~@blueprintjs/core/src/reset" ||
        request.current === "generated/16px/blueprint-icons-16" ||
        request.current === "blueprint-icons-16" ||
        request.current === "generated/20px/blueprint-icons-20" ||
        request.current === "blueprint-icons-20"
        // request.current === "reset"
    ) {
        done({ path: request.current, content: "body {}" });
    } else {
        console.log("IMPORT: ", request);
        // @ts-ignore
        let content = data[request.current];
        if (!content) {
            content = data[request.current + ".scss"];
        }
        if (!content) {
            const parts = request.current.split("/");
            parts[parts.length - 1] = "_" + parts[parts.length - 1];
            const name2 = parts.join("/");
            content = data[name2] || data[name2 + ".scss"];
        }
        // if (!content) {
        //     content = data["~@blueprintjs/core/src/" + request.current.replace("common/", "common/_") + ".scss"];
        // }
        if (!content) {
            const name = absolute(request.previous, request.current);
            console.log("RESOLVE: ", name);
            content = data[name];
        }
        if (!content) {
            const name = absolute(request.previous, request.current);
            const parts = name.split("/");
            parts[parts.length - 1] = "_" + parts[parts.length - 1];
            const name2 = parts.join("/");
            content = data[name2] || data[name2 + ".scss"];
        }
        if (!content) {
            throw new Error("content not found for: " + request.current);
        }
        console.log("IMPORTING: ", request.current, " exists: ", !!content);
        done({
            path: request.current[0] === "~" ? request.current : absolute(request.previous, request.current),
            // eslint-disable-next-line @typescript-eslint/tslint/config
            content,
        });
    }
});

console.log(sass);
sass.compile(
    data["~@blueprintjs/docs-app/src/index.scss"],
    // {
    //     // importer: i => {
    //     //     console.log(i);
    //     //     return;
    //     // },
    //     importer: {
    //         // An importer that redirects relative URLs starting with "~" to
    //         // `node_modules`.
    //         findFileUrl(url: any) {
    //             console.log(url);
    //             // @ts-ignore
    //             return data[url];
    //         },
    //     },
    // },
    (res: any) => {
        console.log("RESULT:", res);
    },
);

ReactDOM.render(
    <BlueprintDocs defaultPageId="blueprint" docs={docsData} tagRenderers={tagRenderers} useNextVersion={false} />,
    document.querySelector("#blueprint-documentation"),
);
