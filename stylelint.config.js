module.exports = {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-config-recommended', 'stylelint-config-standard', 'stylelint-config-recommended-vue'],
  rules: {
    'prettier/prettier': true,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'string-quotes': 'single',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind', 'apply', 'variants', 'responsive', 'screen', 'include', 'mixin', 'each'],
      },
    ],
    'block-no-empty': null,
    'unit-allowed-list': ['em', 'rem', 's', 'px', '%', 'vh'],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
  ignoreFiles: ['**/node_modules/**'],
}
