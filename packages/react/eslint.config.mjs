import pluginReact from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import rootConfig, { baseRules } from '../../eslint.config.mjs';

export default [
  ...rootConfig,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
  },
  {
    rules: {
      ...baseRules,
      ...hooksPlugin.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];
