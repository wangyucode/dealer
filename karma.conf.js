module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            {pattern: "src/**/*.ts"}
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"]
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ['Chrome'],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.test.json"
        },
    });
};
