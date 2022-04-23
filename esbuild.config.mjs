import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minimist } from '@p-mcgowan/minimist';
import { build } from 'esbuild';

const dir = dirname(fileURLToPath(import.meta.url));
const { dependencies = {}, devDependencies = {} } = JSON.parse(
  await readFile(join(dir, 'package.json'))
);

build({
  bundle: true,
  entryPoints: [join(dir, 'src', 'index.ts')],
  external: [
    ...Object.keys(dependencies ?? {}),
    ...Object.keys(devDependencies ?? {}),
  ],
  format: 'esm',
  keepNames: true,
  outfile: join(dir, 'dist', 'index.mjs'),
  platform: 'node',
  sourcemap: 'external',
  target: 'node14',
  treeShaking: true,
  watch: 'watch' in minimist(process.argv.slice(2)),
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
