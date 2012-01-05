// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var common = require('../common.js'),
    assert = require('assert'),
    child = require('child_process'),
    nodejs = '"' + process.execPath + '"',
    path = require('path'),
    util = require('util');

// replace \ by / because windows uses backslashes in paths, but they're still
// interpreted as the escape character when put between quotes.
var filename = __filename.replace(/\\/g, '/');
var dirname = path.dirname(filename);
var bootscript = dirname + "/sample-boot.js";

if (typeof(util.TEST_boot_script_exit_code) !== "undefined") {
  process.exit(util.TEST_boot_script_exit_code);
}

child.exec(nodejs + " --boot " + bootscript + " " + filename,
  function(status, stdout, stderr) {
    assert.equal(status.code, 42);
  });

child.exec(nodejs + " -b " + bootscript + " " + filename,
  function(status, stdout, stderr) {
    assert.equal(status.code, 42);
  });

// TODO boot scripts for eval are explicitly disabled at the moment:
child.exec(nodejs + " -b " + bootscript + " -p -e 'require(\"util\").have_boot_script' ",
  function(status, stdout, stderr) {
    // we fail hard during ParseArgs() if --boot and --eval arse specified
    assert.equal(status.code, 1);
  });


