module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react', // If using React
    '@babel/preset-typescript', // If using TypeScript
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
