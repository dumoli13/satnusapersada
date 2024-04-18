const path = require('path');

const lintFix = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const prettierWrite = (filenames) =>
  `yarn prettier --config ./.prettierrc.json --ignore-unknown --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '**/*.ts?(x)': () => 'yarn type:check',
  '*.{js,jsx,ts,tsx}': lintFix,
  '**/*': prettierWrite,
};
