var should = require('should'),
  rust = require('./index.js'),
  fs = require('fs'),
  async = require('async'),
  client = new rust({config:'./app.config.test', args:'./vm.args.test'});

describe('API', function(){
  before(function(done){
    var files = ['./app.config', './vm.args'];
    var iterator = function(file, callback){
      var read = fs.createReadStream(file);
      var write = fs.createWriteStream(file + '.test');
      read.on('end', callback);
      read.on('error', callback);
      read.pipe(write);
    };
    async.each(files, iterator, function(err){
      if(err){
        throw err;
      }
      done();
    });
  });
  it('should set a host name', function(done){
    client.setHostName('10.10.2.3', function(err){
      should.equal(err, null);
      fs.readFile('./app.config.test', function(err, blob){
        should.notEqual(blob.toString().indexOf('10.10.2.3'), -1);
        done();
      });
    })
  });
  after(function(done){
    var files = ['./app.config.test', './vm.args.test'];
    async.each(files, fs.unlink, function(err){
      if (err){
        throw err;
      }
      done();
    });
  });
});
