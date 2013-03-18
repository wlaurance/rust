var fs = require('fs'),
  spawn = require('child_process').spawn;

var replace = function(params, callback){
  var p = spawn('./node_modules/.bin/replace', [params.regex, params.value, params.file], {stdio:'inherit'});
  p.on('exit', function(code){
    callback();
  });
};
module.exports = function(params){
  return {
    getType:function(callback){
      fs.readFile(params.config, function(err, blob){
        blob.toString().replace(/storage_backend,(.+)}/g, function(b, c){
          callback(null, c.trim());
        });
      });
    },
    setType:function(type, callback){
      replace({
        regex:'storage_backend,(.+)}',
        value:'storage_backend, ' + type + ' }',
        file:params.config
      }, callback);
    }
  };
};

