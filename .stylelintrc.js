module.exports = {
    extends: 'stylelint-config-airbnb',
    rules: {
        indentation: 4,
        'at-rule-empty-line-before': [
            'always',
            {
                ignore: ['after-comment'],
                ignoreAtRules: ['else'],
                except: ['first-nested', 'blockless-after-same-name-blockless'],
            },
        ],
        'max-nesting-depth': null,
        'rule-empty-line-before': [
            'always',
            {
                ignore: ['after-comment'],
                except: ['first-nested'],
            },
        ],
        'selector-max-id': 1,
        'string-quotes': 'single',
        // stylelint-scss
        'scss/at-else-empty-line-before': 'never',
        'scss/at-mixin-argumentless-call-parentheses': 'always',
        'scss/dollar-variable-colon-space-after': 'always',
        'scss/selector-no-redundant-nesting-selector': true,
        // stylelint-order
        'order/properties-alphabetical-order': true,
        'order/order': [
            { type: 'at-rule' },
            'declarations',
            {
                type: 'at-rule',
                hasBlock: true,
            },
            'rules',
            {
                type: 'at-rule',
                name: 'return',
            },
        ],
    },
    defaultSeverity: 'error',
};
