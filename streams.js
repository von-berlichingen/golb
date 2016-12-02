var fs = require('fs');
var stream = fs.createReadStream(__dirname + '/contents/index.html');

stream.on('data', function(chunk) {
  console.log(chunk.toString());
});

stream.on('end', function() {
  console.log('END!!');
});
