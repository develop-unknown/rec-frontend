module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-standard'],
  rules: {
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
