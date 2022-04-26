import cloneDeep from 'lodash-es/cloneDeep.js';
import { dump, identity } from './rooms';
import { cutRoutes, putKeys, putMines, putSpawns } from './usecase';
import { CUT_RATE } from './constants';

const rooms = cloneDeep(identity);
const cutted = cutRoutes(rooms, CUT_RATE);
const puttedMines = putMines(cutted);
const puttedSpawns = putSpawns(puttedMines);
const puttedKeys = putKeys(puttedSpawns);
console.log(dump(puttedKeys));
