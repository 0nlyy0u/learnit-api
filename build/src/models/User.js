"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true //Khong ai co username giong nhau

  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('users', UserSchema);