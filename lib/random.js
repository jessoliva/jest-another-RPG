// module.exports = {}; // this makes test fail

module.exports = function(val1, val2) { // this makes test pass
    if (val1 === val2) {
      return true;
    } else {
      return false;
    }
};