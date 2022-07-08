function contains(array, value) {
  return array.includes(value);
}

function isEmpty(array) {
  return array.length === 0;
}

module.exports = {
  contains,
  isEmpty
};