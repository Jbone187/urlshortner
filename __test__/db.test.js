const fakedb = {
  RowDataPacket: [
    {
      ID: 258,
      Link: "https://www.marketwatch.com/investing/stock/goog",
      Short: "y9glu"
    }
  ]
};

const compare = {
  RowDataPacket: [
    {
      ID: 258,
      Link: "https://www.marketwatch.com/investing/stock/goog",
      Short: "y9glu"
    }
  ]
};

test("Test Fake DB", () => {
  expect(fakedb).toMatchObject(compare);
});
