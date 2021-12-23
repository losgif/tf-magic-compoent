import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: id => !/^[./]/.test(id)
})

export default [
  bundle({
    plugins: [
      postcss({
        modules: true,
        extract: true,
        minimize: true
      }),
      esbuild()
    ],
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        preserveModules: true
      },
      {
        dir: 'es',
        format: 'es',
        sourcemap: true,
        preserveModules: true
      }
    ]
  }),
  bundle({
    plugins: [dts()],
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        preserveModules: true
      },
      {
        dir: 'es',
        format: 'es',
        preserveModules: true
      }
    ]
  })
]
