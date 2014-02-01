var api = exports;

var ometajs = require('../ometajs'),
    path = require('path'),
    fs = require('fs');

//
// ### function compile (code, options, cb)
// #### @code {String} Ometajs source code
// #### @options {Object} Compiler options
// Compiles ometajs to javascript
//
api.compile = function compile(code, options, _) {
  options || (options = {});
  var ast = ometajs.parser.create(code).execute(),
      compiler = ometajs.compiler.create(ast, options);

  return compiler.execute();
};

//
// Allow require('filename.ometajs')
//
require.extensions['.ometajs'] = function loadExtension(module, filename) {
  var content = fs.readFileSync(filename).toString(), source, ret;
  api.compile(content, {
    root: path.resolve(__dirname, '../../lib/ometajs')
  }, function (e) {
     source = e;
  });

  module._compile(source, filename, function (e) {
    ret = e;
  });

  return ret;
};
