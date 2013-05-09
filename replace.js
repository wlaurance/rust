module.exports = function(params, callback){
  var p = require('child_process').spawn('./local_bin/replace/bin/replace.js', [params.regex, params.value, params.file], {stdio:'inherit'});
  p.on('exit', function(code){
    callback();
  });
};
