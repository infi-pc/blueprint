/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 */

const { createKarmaConfig } = require("@blueprint-modernized/karma-build-scripts");

module.exports = function (config) {
    const baseConfig = createKarmaConfig({
        coverage: false,
        dirname: __dirname,
    });
    config.set(baseConfig);
};
