// Tech Model
var Tech = require('../../models/tech.js');

// API: List / Fetch all Techs
exports.list = function (req, res, next) {

  Tech.find(function(err, techs) {
    if (err) {
      res.send(err);
    } else {
      res.json(techs); 
    }
  });
};

// API: Show / Fetch a single Tech
exports.show = function (req, res, next) {
  var id = req.params._id;
  if (!id) return next('route');
  Tech.find({'id': id}, function (err, techs) {
    if (err) {
      res.send(err);
    } else {
      if (techs.count == 0) {
        res.send("Not Found");
      } else {
        res.json(techs[0]);
      }
    }
  });
};

// API: Create
exports.create = function (req, res, next) {
  var newTech = new Tech(req.body);
  newTech.save(function(err, newTech) {
    if (err) {
      res.send(err);
    } else {
      res.json(newTech);
    }
  });
}

// API: Update
exports.update = function (req, res, next) {
  Tech.update({_id: req.params._id}, {$set : req.body}, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json("Success");
    }
  });
}
