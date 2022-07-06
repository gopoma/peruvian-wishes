function parseDate(str) {
  const date = new Date(str);

  let day = date.getDate() + 1;
  day = day < 10 ? `0${day}` : day;
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

module.exports = {
  parseDate
};