import {SQRT_OPERATION} from "./calc";

export function format(str: string) {
  const sqrtRegxp = /(\d*)\*\*0.5/gi;
  const str1 = str.replaceAll(sqrtRegxp, (match, groupOne) => {
    return `√${groupOne}`;
  })
    .replaceAll("*", "x")
    .replaceAll(".", ",");

  return str1;
}

export function unformat(str: string) {
  const sqrtRegxp = /√(\d*)/gi;
  const str1 = str.replaceAll(sqrtRegxp, (match, groupOne) => {
    return `${groupOne}${SQRT_OPERATION}`;
  })
    .replaceAll("x", "*")
    .replaceAll(",", ".");

  return str1;
}
