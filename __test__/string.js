function verbiage() {
  let short = Math.random()
    .toString(36)
    .substring(2, 7);

  return short;
}
module.exports = verbiage;
