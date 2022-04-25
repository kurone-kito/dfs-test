import { close } from './route';
import type { Room } from './room';
import { hasAnyItem } from './room';
import {
  closeInvalidRoutes,
  getExplorableRoomsLength,
  hasUnexplorableMine,
} from './rooms';
import { DIR_MAX, KEYS, MINES, SPAWNS } from './constants';

const cutRoutesRec = (
  rooms: readonly Room[],
  amount: number
): readonly Room[] => {
  if (amount < 0) {
    return rooms;
  }
  const tagetRoomIndex = Math.floor(Math.random() * rooms.length);
  const closeTarget = close(Math.floor(Math.random() * DIR_MAX));
  const nextRooms = closeInvalidRoutes(
    rooms.map((room, index) =>
      index === tagetRoomIndex
        ? { ...room, route: closeTarget(room.route) }
        : room
    )
  );
  const next = getExplorableRoomsLength(nextRooms) === rooms.length;
  return cutRoutesRec(next ? nextRooms : rooms, amount - (next ? 1 : 0));
};

export const cutRoutes = (rooms: readonly Room[], percentage: number) =>
  cutRoutesRec(rooms, Math.floor(rooms.length * DIR_MAX * percentage));

const putMinesRec = (rooms: readonly Room[], putted = 0): readonly Room[] => {
  if (putted >= MINES) {
    return rooms;
  }
  const tagetRoomIndex = Math.floor(Math.random() * rooms.length);
  if (rooms[tagetRoomIndex]?.hasMine) {
    return putMinesRec(rooms, putted);
  }
  const nextRooms = rooms.map((room, index) =>
    index === tagetRoomIndex ? { ...room, hasMine: true } : room
  );
  const next =
    !hasUnexplorableMine(nextRooms) &&
    getExplorableRoomsLength(nextRooms) === rooms.length - putted;
  return putMinesRec(next ? nextRooms : rooms, putted + (next ? 1 : 0));
};

export const putMines = (rooms: readonly Room[]) => putMinesRec(rooms);

const putItemsFactory = (putItem: (room: Room) => Room) => {
  const putItemsRec = (
    rooms: readonly Room[],
    amount: number
  ): readonly Room[] => {
    if (!amount) {
      return rooms;
    }
    const taget = Math.floor(Math.random() * rooms.length);
    const room = rooms[taget];
    if (!room || hasAnyItem(room)) {
      return putItemsRec(rooms, amount);
    }
    const nextRooms = rooms.map((v, i) => (i === taget ? putItem(v) : v));
    return putItemsRec(nextRooms, amount - 1);
  };
  return putItemsRec;
};

const innerPutSpawns = putItemsFactory((room) => ({ ...room, hasSpawn: true }));

export const putSpawns = (rooms: readonly Room[]) =>
  innerPutSpawns(rooms, SPAWNS);

const innerPutKeys = putItemsFactory((room) => ({ ...room, hasKey: true }));

export const putKeys = (rooms: readonly Room[]) => innerPutKeys(rooms, KEYS);
