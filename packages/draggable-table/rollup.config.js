import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import less from 'rollup-plugin-less';
import { terser } from "rollup-plugin-terser"

const name = require('./package.json').main.replace(/\.js$/, '')

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: id => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [
      esbuild(),
      less()
    ],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.min.js`,
        format: 'cjs',
        plugin: [terser()],
        sourcemap: true,
      },
      {
        file: `${name}.esm.js`,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: `${name}.esm.min.js`,
        format: 'esm',
        plugin: [terser()],
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
]
