var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*POST csv data*/
router.post('/data',function (req,res,next) {
  console.log("received data for saving");
  var filename = req.body.filename;
  var data = req.body.data;
  console.log(filename);
  var path = "public/uploads/" + filename;
    fs.open(path, 'w+', function(err, file) {
        if (err) {
            console.log("ERROR !! " + err);
        } else {

            var csvfile = fs.createWriteStream(path, {
                flags: 'a' // 'a' means appending (old data will be preserved)
            });
            csvfile.write(data);
            csvfile.end();
            res.send(200,"OK");
        }
    });
});

module.exports = router;
