export const SQRT_OPERATION = "**0.5";

export function calc(expression: string): number {
  return new Function(`return ${expression};`)();
}
