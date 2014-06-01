'use strict';

var assert = require('assert');
var Reader = require('../lib/reader');
var path = require('path');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Reader).run(
    [], // inputs
    {
        paths: [ path.join(__dirname, './fixtures/foo.js') ]
    }, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs[0].contents.toString(), 'var foo;\n')
}).catch(errorHandler)
