# ð£ The practice of the depth-first search

The project is a practice of the depth-first search for [ð» Fantomo](https://github.com/kurone-kito/fantomo).

## TL; DR

```sh
npm ci && npm run build && npm run bin
```

### Result

```txt
ââââkââ¬â
ââ¼ââ¬â´kâ¼P
ââ¼â¼â¤âkâ¼â
ââ¼âkâ¼kâ¤â
âkâ¼â¤ââââµ
ââ¬â¼â´â¼â¼â¬â
ââ¼â¼PâPâ¼k
ââ´ââµkkâ´â´
```

- `â¼`: Route
- `â`: Mine
- `k`: Key
- `P`: Spawn area

## System Requirements

- Node.js Fermium LTS (`^14.19.1`)

## Install the dependencies

```sh
npm install
```

## Build (transpile)

The command creates a `dist` directory with the compiled JavaScript files.

```sh
npm run build
```

When you want to build with watch on development, you can use the command.

```sh
npm start
```

## Invoke the transpiled code

The command invokes the transpiled code: `dist/index.mjs`.

```sh
npm run bin
```

## Linting

```sh
npm run lint
npm run lint:fix # Lint and auto-fix
```

## Testing

```sh
npm run test
```

Currently, the command works as an alias for the `npm run lint` command.

## Rules for Development

Introduce commit message validation at commit time.
â**[Conventional Commits](https://www.conventionalcommits.org/ja/)**â
rule is applied to discourage committing messages that violate conventions.

## LICENSE

MIT
