module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { useBuiltIns: 'usage', corejs: 3, targets: { node: 'current' } },
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
