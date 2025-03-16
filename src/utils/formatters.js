function arrayToObject(arr) {
  return arr.reduce((obj, value, index) => {
    obj[index + 1] = value; // Start indexing from 1
    return obj;
  }, {});
}

module.exports = { arrayToObject };
