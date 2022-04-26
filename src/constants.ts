import { Dir } from './route';

export const WIDTH = 8;
export const MINES = 9;
export const KEYS = 9;
export const SPAWNS = 3;
export const ROOMS = WIDTH ** 2;
export const CUT_RATE = 0.1;
export const DIR_MAX = Math.max(Dir.N, Dir.E, Dir.W, Dir.S) + 1;
