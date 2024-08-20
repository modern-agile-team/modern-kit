import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import eslintImport from 'eslint-plugin-import';

const ignores = [
  '**/dist',
  '**/coverage',
  'eslint.config.mjs',
  'scripts',
  '**/*.spec.ts',
  '.vscode',
  '.yarn',
  'dist',
  'esm',
  'docusaurus.config.js',
];

const rules = {
  ...hooksPlugin.configs.recommended.rules,
  ...pluginReact.configs.recommended.rules,
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unnecessary-type-constraint': 'off',
  'import/no-anonymous-default-export': 'off',
  'no-useless-escape': 'off',
  'react/react-in-jsx-scope': 'off',
  '@typescript-eslint/no-restricted-types': 'warn',
  'react/prop-types': 'off',
};

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      import: eslintImport,
      'react-hooks': hooksPlugin,
    },
  },
  {
    ignores,
  },
  {
    rules,
  },
];
