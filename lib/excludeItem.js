'use strict';

module.exports = (arr, flag) =>
  arr.filter(r => r.method.toLowerCase() !== flag.toLowerCase());
