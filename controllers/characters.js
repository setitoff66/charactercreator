const mongoose = require('mongoose');
const Character = mongoose.model('Character');
const Review = mongoose.model('Review');

class Characters {
  getAll(req, res) {
    Character.find({}, (err, characters) => {
      if (err) {
        console.log(err);
      }

      res.json({status: 200, characters: characters});
    });
  }
  getOne(req, res) {
    Character.findOne({_id: req.params._id}, (err, character) => {
      if (err) {
        console.log(err);
      }
      res.json({status: 200, character: character});
    });
  }
  create(req, res) {
    let c = new Character(req.body);
    c.save((err) => {
      if (err) {
        res.json({status: 200, errors: err});
      } else {
        res.json({status: 200});
      }
    });
  }
  review(req, res) {
    let r = new Review(req.body);
    r.save((err) => {
      if (err) {
        res.json({status: 200, errors: err});
      } else {
        Character.findOneAndUpdate(
          {_id: req.params._id},
          {$push: {reviews: r}},
          (err) => {
            if (err) {
              res.json({status: 200, errors: err});
            } else {
              res.json({status: 200});
            }
          }
        );
      }
    });
  }
  // update(req, res) {
  //   Character.findOneAndUpdate(
  //     {_id: req.params._id},
  //     req.body,
  //     {runValidators: true},
  //     (err) => {
  //       if (err) {
  //         res.json({status: 200, errors: err});
  //       } else {
  //         res.json({status: 200});
  //       }
  //     }
  //   );
  // }
  // delete(req, res) {
  //   Character.findOneAndDelete({_id: req.params._id}, (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.json({status: 200});
  //   });
  // }
}

module.exports = new Characters();
