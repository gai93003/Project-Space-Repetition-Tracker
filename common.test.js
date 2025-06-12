import { getUserIDs, dateRepetion, dateFormat } from "./common.mjs";
// import assert from "node:assert";
// import test from "node:test";

// test("User count is correct", () => {
//   assert.equal(getUserIDs().length, 5);
// });

test ("Date should be in the right format", () => {
  const dateObj = new Date(2025, 5, 9);
  const expectedDate = `9th June 2025`;

  expect(dateFormat(dateObj)).toBe(expectedDate);
});

test ("Revision dates should be repeated in intervals of 1 week, 1 month etc", () => {
  const revision = {
    topic: "Function JS",
    date: new Date(2015, 2, 25) // March 25, 2015
  };

  const revisionDates = dateRepetion(revision);

  expect(dateFormat(revisionDates[0].date)).toBe("1st April 2015");
  expect(dateFormat(revisionDates[1].date)).toBe("25th April 2015");
  expect(dateFormat(revisionDates[4].date)).toBe("25th March 2016");
});

describe("Tests for getUserIds function.", () => {
  let users = getUserIDs();

  test("There should be 5 users from getUserId function", () => {
    expect(users.length).toBe(5);
  });

  test("getUserIds function should always return an array which is not empty.", () => {
    expect(Array.isArray(users)).toBe(true);
    expect(users.length === 0).toBe(false);
  }); 
});