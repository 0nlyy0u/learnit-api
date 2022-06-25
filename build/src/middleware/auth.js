"use strict";

var jwt = require('jsonwebtoken');

var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.header('Authorization');
  var token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(400).json({
    success: false,
    message: 'Access token not found'
  });

  try {
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      massage: 'Internet server error'
    }); //403 forbidden
  }
};

module.exports = verifyToken;