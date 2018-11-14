const url = require("./checkurl");

test("Testing URL Variable", () => {
  expect(url()).toMatch("http://localhost:3000/");
});
