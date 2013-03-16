var fs = require('fs'),
  spawn = require('child_process').spawn;

var replace = function(params, callback){
  var p = spawn('./node_modules/.bin/replace', [params.regex, params.value, params.file], {stdio:'inherit'});
  p.on('exit', function(code){
    callback();
  });
};

module.exports = function(params){
  var rust = {
    setHostName:function(host, callback){
      var ops = {
        regex:'http, (.+)"',
        value:'http, [ {"' + host + '"',
        file:params.config
      };
      replace(ops, callback);
    },
    setHTTPPort:function(port, callback){
      var ops = {
        regex:'http, (.+), (.+) }',
        value:'http, $1, ' + port + ' }',
        file:params.config
      };
      replace(ops, callback);
    }
  };
  return rust;
};
