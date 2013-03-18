var fs = require('fs');
module.exports = function(params){
  return {
    getType:function(callback){
      fs.readFile(params.config, function(err, blob){
        blob.toString().replace(/storage_backend,(.+)}/g, function(b, c){
          callback(null, c.trim());
        });
      });
    }
  };
};

