module.exports = {
  root: true,
  env: {
    es2020: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      impliedStrict: true,
    },
    requireConfigFile: false,
  },
  settings: {
    noInlineConfig: true,
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs'],
      },
    },
    node: {
      allowModules: ['electron'],
      resolvePaths: [__dirname],
      tryExtensions: ['.js', '.json', '.node', '.ts', '.cjs'],
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'airbnb-base',
    'prettier',
  ],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-array-constructor': 'off',
    'node/no-missing-require': [
      'error',
      {
        allowModules: ['electron'],
        resolvePaths: ['/node_modules'],
        tryExtensions: ['.js', '.json', '.node', '.ts', '.cjs'],
      },
    ],

  },
};
