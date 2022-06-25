"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

require('dotenv').config();

var authRouter = require("./routes/auth");

var postRouter = require("./routes/post");

var conectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return mongoose.connect("mongodb+srv://".concat(process.env.BD_USERNAME, ":").concat(process.env.DB_PASSWORD, "@cluster0.rjsv0uv.mongodb.net/").concat(process.env.DB_NAME, "?retryWrites=true&w=majority"), {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            console.log('MongoDB connected');
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            process.exit(1);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function conectDB() {
    return _ref.apply(this, arguments);
  };
}();

conectDB();
var app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
var PORT = process.env.PORT || 5020;
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});