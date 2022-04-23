# 🛣 The practice of the depth-first search

The project is a practice of the depth-first search for [👻 Fantomo](https://github.com/kurone-kito/fantomo).

## TL; DR

```sh
npm ci && npm run build && npm run bin
```

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
“**[Conventional Commits](https://www.conventionalcommits.org/ja/)**”
rule is applied to discourage committing messages that violate conventions.

## LICENSE

MIT
