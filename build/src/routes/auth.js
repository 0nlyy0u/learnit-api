"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var argon2 = require('argon2');

var jwt = require('jsonwebtoken');

var User = require("../models/User");

var verifyToken = require("../middleware/auth");

var router = express.Router(); //router.get('/', (req, res) => res.send('Hello! Auth'))
// @route POST api/auth/register
// @desc Register user
// @access public

router.post('/register', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, password, user, hashedPassword, newUser, accressToken;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password; //Simple validation

            if (!(!username || !password)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              message: 'Missing username or password'
            }));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return User.findOne({
              username: username
            });

          case 6:
            user = _context.sent;

            if (!user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              message: 'Username already taken'
            }));

          case 9:
            _context.next = 11;
            return argon2.hash(password);

          case 11:
            hashedPassword = _context.sent;
            newUser = new User({
              username: username,
              password: hashedPassword
            });
            _context.next = 15;
            return newUser.save();

          case 15:
            //return token
            accressToken = jwt.sign({
              userId: newUser._id
            }, process.env.ACCESS_TOKEN_SECRET);
            res.json({
              success: true,
              message: 'Ok',
              accressToken: accressToken
            });
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 19]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // @route POST api/auth/login
// @desc Login user
// @access public

router.post('/login', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, username, password, user, passwordValid, accressToken;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password; //Simple validation

            if (!(!username || !password)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: 'Missing username or password'
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return User.findOne({
              username: username
            });

          case 6:
            user = _context2.sent;

            if (user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: 'Incorrect username or password'
            }));

          case 9:
            _context2.next = 11;
            return argon2.verify(user.password, password);

          case 11:
            passwordValid = _context2.sent;

            if (passwordValid) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: 'Incorrect username or password'
            }));

          case 14:
            // all ok
            //return token
            accressToken = jwt.sign({
              userId: user._id
            }, process.env.ACCESS_TOKEN_SECRET);
            res.json({
              success: true,
              message: 'Login success',
              accressToken: accressToken
            });
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 18]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // @route GET api/auth/login
// @desc Check if user is logged in
// @access public

router.get('/', verifyToken, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return User.findById(req.userId).select('-password');

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: 'User not found'
            }));

          case 6:
            res.status(200).json({
              success: true,
              message: 'Login success',
              user: user
            });
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = router;