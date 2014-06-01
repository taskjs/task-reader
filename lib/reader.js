var fs = require('fs');
var Execution = require('execution');
var Record = require('record');

module.exports = Execution.extend({
    options: {
        paths: {
            label: 'Files path',
            type: 'array'
        },
        encoding: {
            label: 'Files encoding',
            type: 'string'
        }
    },
    run: function (inputs, options, logger, settings) {
        if (typeof options === 'string' || Array.isArray(options)) {
            options = {paths: [].concat(options)};
        }
        return this._run(inputs, options, logger, settings);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var logger = this.logger;
        var inputs = this.inputs;

        var paths = options.paths;

        var records = paths.filter(function(filepath){
            return fs.statSync(filepath).isFile()
        }).map(function (filepath) {
            logger.log('Read', filepath);
            return new Record({
                path: filepath,
                contents: fs.readFileSync(filepath, options)
            })
        });

        resolve(inputs.concat(records));
    }

});
