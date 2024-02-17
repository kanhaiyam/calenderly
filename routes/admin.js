var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var data = {};
  data.success = true;
  console.log(data);
  res.json(data);
});

module.exports = router;
