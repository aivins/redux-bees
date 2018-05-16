"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyUrlWithPlaceholders;

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyUrlWithPlaceholders(url, placeholders) {
  var noEncode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var query = {};

  var completeUrl = Object.keys(placeholders).reduce(function (acc, key) {
    var token = ":" + key;

    if (acc.indexOf(token) !== -1) {
      var value = noEncode.includes(key) ? placeholders[key] : encodeURIComponent(placeholders[key]);
      console.log("Replacing", key, token, value);
      return acc.replace(token, value);
    }

    if (placeholders[key] !== null) {
      query[key] = placeholders[key];
    }

    return acc;
  }, url);

  if (Object.keys(query).length > 0) {
    return completeUrl + "?" + _queryString2.default.stringify(query);
  }

  return completeUrl;
}