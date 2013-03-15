var fs = require('fs');

module.exports = function(params){
  var config = fs.readFileSync(params.config).toString();
  var args = fs.readFileSync(params.args).toString();
  var rust = {
    setHostName:function(host, callback){
      rust.write(callback);
    },
    setHTTPPort:function(port, callback){
      rust.write(callback);
    },
    write:function(callback){
      callback();
    }
  };
  return rust;
};
