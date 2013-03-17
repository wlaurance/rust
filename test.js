var should = require('should'),
  rust = require('./index.js'),
  fs = require('fs'),
  async = require('async'),
  client = rust({config:'./app.config.test', args:'./vm.args.test'});

/*
 * test vars
 */
var host = '10.10.2.3', port = 9000, handoff_port = 9001;

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
    client.setHostName(host, function(err){
      should.equal(err, null);
      fs.readFile('./app.config.test', function(err, blob){
        should.notEqual(blob.toString().indexOf("{http, [ {\"" + host + '"'), -1);
        should.equal(blob.toString().indexOf("{https, [ {\"" + host + '"'), -1);
        done();
      });
    });
  });
  it('should set the http port', function(done){
    client.setHTTPPort(port, function(err){
      fs.readFile('./app.config.test', function(err, blob){
        should.notEqual(blob.toString().indexOf("{http, [ {\"" + host + '", ' + port), -1);
        should.equal(blob.toString().indexOf("{https, [ {\"" + host + '", ' + port), -1);
        done();
      });
    });
  });
  it('should set the handoff port', function(done){
    client.setHandoffPort(handoff_port, function(err){
      fs.readFile('./app.config.test', function(err, blob){
        should.notEqual(blob.toString().indexOf("handoff_port, " + handoff_port), -1);
        done();
      });
    });
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
