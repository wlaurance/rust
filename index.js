module.exports = function(params){
  var rust = {
    setHostName:function(host, callback){
      rust.write(callback);
    },
    write:function(callback){
      callback();
    }
  };
  return rust;
};
