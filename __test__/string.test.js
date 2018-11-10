const verbiage = require("./string");

test("If Random Verbiage is True", () => {
  expect(typeof string).toEqual(expect.not.stringContaining(verbiage()));
});
