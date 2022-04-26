import chalk from 'chalk';
import type { Route } from './route';
import { opened } from './route';

export interface Room {
  readonly route: Route;
  readonly hasKey: boolean;
  readonly hasMine: boolean;
  readonly hasSpawn: boolean;
}

export const identity = Object.freeze<Room>({
  route: opened,
  hasKey: false,
  hasMine: false,
  hasSpawn: false,
});

const routeChars = new Map<number, string>([
  [0, ' '],
  [1, '╵'],
  [2, '╶'],
  [3, '└'],
  [4, '╴'],
  [5, '┘'],
  [6, '─'],
  [7, '┴'],
  [8, '╷'],
  [9, '│'],
  [10, '┌'],
  [11, '├'],
  [12, '┐'],
  [13, '┤'],
  [14, '┬'],
  [15, '┼'],
]);

export const hasAnyItem = (room: Room) =>
  room.hasKey || room.hasMine || room.hasSpawn;

const routeToNumber = (route: Route) =>
  route.reduce((acc, cur, index) => acc + (cur ? 2 ** index : 0), 0);

export const dump = (room: Room) =>
  room.hasMine
    ? chalk.redBright('●')
    : room.hasSpawn
    ? chalk.cyanBright('P')
    : room.hasKey
    ? chalk.yellowBright('k')
    : routeChars.get(routeToNumber(room.route)) || '?';
