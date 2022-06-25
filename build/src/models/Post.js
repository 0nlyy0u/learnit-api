"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  status: {
    type: String,
    "enum": ['TO LEARN', 'LEARNING', 'LEARNED']
  },
  user: {
    type: Schema.Types.ObjectId,
    //
    ref: 'users',
    //Noi sang bang user
    required: true
  }
});
module.exports = mongoose.model('posts', PostSchema);