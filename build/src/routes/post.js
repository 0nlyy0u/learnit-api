"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router();

var verifyToken = require("../middleware/auth");

var Post = require("../models/Post"); //@route POST api/post
// @desc Create post
// @access Private


router.post('/', verifyToken, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, description, url, status, newPost;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, url = _req$body.url, status = _req$body.status;
            console.log(req.body); //simple validation

            if (title) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              message: 'Title is required'
            }));

          case 4:
            _context.prev = 4;
            newPost = new Post({
              title: title,
              description: description,
              url: url.startsWith('https://') ? url : "https://".concat(url),
              status: status || 'TO LEARN',
              user: req.userId
            });
            _context.next = 8;
            return newPost.save();

          case 8:
            res.json({
              success: true,
              message: 'Happy learning!',
              post: newPost
            });
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //@route GET api/post
// @desc Get post
// @access Private

router.get('/', verifyToken, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var posts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Post.find({
              user: req.userId
            }).populate('user', ['username']);

          case 3:
            posts = _context2.sent;
            res.json({
              success: true,
              posts: posts
            });
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //@route PUT api/post
// @desc Update post
// @access Private

router.put('/:id', verifyToken, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, title, description, url, status, updatedPost, postUpdateCondition;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, url = _req$body2.url, status = _req$body2.status; //simple validation

            if (title) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: 'Title is required'
            }));

          case 3:
            _context3.prev = 3;
            updatedPost = {
              title: title,
              description: description || '',
              url: (url.startsWith('https://') ? url : "https://".concat(url)) || '',
              status: status || 'TO LEARN'
            };
            postUpdateCondition = {
              _id: req.params.id,
              user: req.userId
            }; // Dieu kien id cua post va user tao phai dung

            _context3.next = 8;
            return Post.findOneAndUpdate(postUpdateCondition, updatedPost, {
              "new": true
            });

          case 8:
            updatedPost = _context3.sent;

            if (updatedPost) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              success: false,
              message: 'Post not found'
            }));

          case 11:
            res.json({
              success: true,
              message: 'Updated success!',
              post: updatedPost
            });
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 14]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //@route GET api/post
// @desc Get post
// @access Private

router.get('/', verifyToken, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var posts;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Post.find({
              user: req.userId
            }).populate('user', ['username']);

          case 3:
            posts = _context4.sent;
            res.json({
              success: true,
              posts: posts
            });
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //@route DELETE api/post
// @desc Delete post
// @access Private

router["delete"]('/:id', verifyToken, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var postDeleteCondition, deletedPost;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            postDeleteCondition = {
              _id: req.params.id,
              user: req.userId
            }; // Dieu kien id cua post va user tao phai dung

            _context5.next = 4;
            return Post.findOneAndDelete(postDeleteCondition);

          case 4:
            deletedPost = _context5.sent;

            if (deletedPost) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(401).json({
              success: false,
              message: 'Post not found'
            }));

          case 7:
            res.json({
              success: true,
              message: 'Deleted success!',
              post: deletedPost
            });
            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.status(500).json({
              success: false,
              massage: 'Internet server error'
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;