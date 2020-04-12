export function choose(): boolean;
export function choose(choices: number): number;
export function choose(choices?: number): boolean | number {
  if (!choices) {
    return Math.floor(Math.random() * 2 + 1) === 1;
  }

  return choices === 1 ? 1 : Math.floor(Math.random() * choices + 1);
}

export function sample<T>(values: T[]): T {
  return values[choose(values.length) - 1];
}
