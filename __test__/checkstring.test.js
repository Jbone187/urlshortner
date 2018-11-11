const url = require("./checkstring");

test("Testing URL Variable", () => {
  expect(url()).toMatch("http://localhost:3000/");
});
