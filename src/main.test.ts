import { calc } from "./App/calc";
import {format, unformat} from "./App/format";

test("Calc", () => {
  expect(calc("2 * 3 + 4")).toBe(10);

  const calcTestFunc = function () {
    calc("1*******");
  };
  expect(calcTestFunc).toThrow();

  expect(calc("")).toBeUndefined();
});

test("Format", () => {
  expect(format("5 * 5")).toBe("5 x 5");
  expect(format("4**0.5")).toBe("√4");
  expect(format("4.5")).toBe("4,5");
  expect(format("4.5 * 2 + 4**0.5")).toBe("4,5 x 2 + √4");
});

test("Unformat", function () {
  expect(unformat("5 x 5")).toBe("5 * 5");
  expect(unformat("√4")).toBe("4**0.5");
  expect(unformat("4,5")).toBe("4.5");
  expect(unformat("4,5 x 2 + √4")).toBe("4.5 * 2 + 4**0.5");
});
