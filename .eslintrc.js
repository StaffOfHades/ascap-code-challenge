/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  plugins: ['jsx-a11y', 'sonarjs'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
};
