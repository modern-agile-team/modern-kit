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
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
    },
  },
  {
    // 모듈 확장(declare module)은 빈 interface 로 기존 타입을 extends 해야 하므로 허용합니다.
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
    },
  },
];
