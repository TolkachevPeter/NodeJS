module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  plugins: [
		'promise',
		'no-unsafe-regex',
		'new-with-error',
		'@typescript-eslint',
	],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
