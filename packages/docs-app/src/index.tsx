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

// import sass from "sass";
// @ts-ignore
import Sass from "sass.js/dist/sass.js";

import { docsData } from "@blueprintjs/docs-data";
import { createDefaultRenderers, ReactDocsTagRenderer, ReactExampleTagRenderer } from "@blueprintjs/docs-theme";

import { BlueprintDocs } from "./components/blueprintDocs";
import data from "./generatedStyles";
import * as ReactDocs from "./tags/reactDocs";
import { reactExamples } from "./tags/reactExamples";

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

    if (request.current === "~normalize.css/normalize.css") {
        done({ path: request.current, content: "" });
    } else {
        // @ts-ignore
        const content = data[request.path];
        console.log("IMPORTING: ", request.current, " exists: ", !!content);
        done({ path: request.current, content });
    }
});

console.log(sass);
sass.compile(
    data["packages/docs-app/src/index.scss"],
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
        console.log("RES:", res);
    },
);

ReactDOM.render(
    <BlueprintDocs defaultPageId="blueprint" docs={docsData} tagRenderers={tagRenderers} useNextVersion={false} />,
    document.querySelector("#blueprint-documentation"),
);
