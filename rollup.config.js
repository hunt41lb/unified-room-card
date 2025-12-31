import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/unified-room-card.ts',
  output: {
    file: 'dist/unified-room-card.js',
    format: 'es',
    sourcemap: !production,
  },
  plugins: [
    // Resolve node_modules dependencies
    resolve({
      browser: true,
      preferBuiltins: false,
    }),

    // Convert CommonJS modules to ES6
    commonjs(),

    // Compile TypeScript
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !production,
      inlineSources: !production,
    }),

    // Minify for production
    production &&
      terser({
        ecma: 2021,
        module: true,
        compress: {
          drop_console: false, // Keep console.info for version logging
          drop_debugger: true,
          passes: 2,
        },
        mangle: {
          properties: false, // Don't mangle property names (important for HA compatibility)
        },
        output: {
          comments: false,
        },
      }),
  ],

  // Don't bundle these - they're provided by Home Assistant
  external: [],

  // Suppress circular dependency warnings from lit
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    warn(warning);
  },
};
