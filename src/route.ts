export enum Dir {
  N,
  E,
  W,
  S,
}

export type Route<T = boolean> = readonly [T, T, T, T];

const invDirs = new Map<Dir, Dir>([
  [Dir.N, Dir.S],
  [Dir.E, Dir.W],
  [Dir.W, Dir.E],
  [Dir.S, Dir.N],
]);

export const opened: Route = [true, true, true, true] as const;

export const closed: Route = [false, false, false, false] as const;

export const close = (dir: Dir) => (route: Route) =>
  route.map((v, i) => v && i !== dir) as unknown as Route;

export const invert = (dir: Dir) => invDirs.get(dir) ?? dir;

export const closeWith =
  <T>(predicate: (value: T) => boolean) =>
  (route: Route, list: Route<T>) =>
    route.map((v, i) => v && predicate(list[i as Dir])) as unknown as Route;
