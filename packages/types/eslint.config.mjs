import rootConfig, { baseRules } from '../../eslint.config.mjs';

export default [
  ...rootConfig,
  {
    rules: baseRules,
  },
];
