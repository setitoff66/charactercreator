const mongoose = require('mongoose');
const ReviewSchema = require('./review');
const CharacterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Character Name can't be blank"],
      minlength: [2, 'Name cannot be one letter'],
    },
    description: {
      type: String,
      required: [true, "Character Name can't be blank"],
      minlength: [0, 'Name cannot be one letter'],
    },
    charType: {
      type: String,
      required: [true, "Character Name can't be blank"],
      minlength: [0, 'Name cannot be one letter'],
    },

    image: {type: String},
    reviews: [ReviewSchema],
  },
  {timestamps: true}
);

mongoose.model('Character', CharacterSchema);
