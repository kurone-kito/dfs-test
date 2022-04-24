import cloneDeep from 'lodash-es/cloneDeep.js';
import { ROOMS, WIDTH } from './constants';
import type { Room } from './room';
import { dump as dumpRoom, identity as roomIdentity } from './room';
import type { Route } from './route';
import { closed, invert } from './route';

export interface Point {
  readonly x: number;
  readonly y: number;
}

export const identity = Array.from<unknown, Room>({ length: ROOMS }, () =>
  cloneDeep(roomIdentity)
);

export const dump = (rooms: readonly Room[]) =>
  rooms.reduce(
    (acc, cur, index) =>
      `${acc}${index > 0 && index % WIDTH === 0 ? '\n' : ''}${dumpRoom(cur)}`,
    ''
  );

export const indexToPoint = (index: number) =>
  Object.freeze<Point>({ x: index % WIDTH, y: Math.floor(index / WIDTH) });

export const pointToIndex = ({ x, y }: Point) =>
  x < 0 || x >= WIDTH || y < 0 || y >= WIDTH ? -1 : x + y * WIDTH;

export const getNeighborsIndex = (
  route: Route,
  index: number
): Route<number> => {
  const { x, y } = indexToPoint(index);
  const r = index >= 0 ? route : closed;
  return [
    r[0] ? pointToIndex({ x, y: y - 1 }) : -1, // N
    r[1] ? pointToIndex({ x: x + 1, y }) : -1, // E
    r[2] ? pointToIndex({ x: x - 1, y }) : -1, // W
    r[3] ? pointToIndex({ x, y: y + 1 }) : -1, // S
  ] as const;
};

export const hasUnexplorableMine = (rooms: readonly Room[]) =>
  rooms
    .map((room, index) => [room, room.hasMine ? index : -1] as const)
    .filter(([, index]) => index >= 0)
    .some(([room, index]) =>
      getNeighborsIndex(room.route, index).every(
        (i) => rooms[i]?.hasMine ?? true
      )
    );

export const closeInvalidRoutes = (rooms: readonly Room[]): readonly Room[] =>
  rooms.map(({ route, ...rest }, index) => {
    const next = getNeighborsIndex(route, index).map(
      (ni, dir) => (ni >= 0 && rooms[ni]?.route[invert(dir)]) ?? false
    ) as unknown as Route;
    return { route: next, ...rest };
  });

const getExplorableRoomsLengthRec = (
  rooms: readonly Room[],
  index = 0,
  visited = new Set<number>()
): number => {
  visited.add(index);
  const { route } = rooms[index] ?? { route: closed };
  return getNeighborsIndex(route, index).reduce(
    (acc, cur) =>
      cur >= 0 && !rooms[cur]?.hasMine && !visited.has(cur)
        ? acc + 1 + getExplorableRoomsLengthRec(rooms, cur, visited)
        : acc,
    0
  );
};

export const getExplorableRoomsLength = (rooms: readonly Room[]): number =>
  getExplorableRoomsLengthRec(rooms) + 1;
