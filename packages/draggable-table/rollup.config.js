import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import less from 'rollup-plugin-less';

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
        file: `${name}.esm.js`,
        format: 'esm',
        sourcemap: true,
      }
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
