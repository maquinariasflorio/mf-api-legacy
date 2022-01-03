module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'ember',
        'ember-suave',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js', 'src/schema.graphql.ts'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        // Global

        'dot-notation'                      : 'off',
        'require-await'                     : 'off',
        'no-async-promise-executor'         : 'off',
        'camelcase'                         : 'off',
        'import/no-relative-parent-imports' : 'off',
        'no-fallthrough'                    : 'off',
        'prefer-destructuring'              : 'off',

        'prefer-const'                 : 'error',
        'eol-last'                     : [ 'error', 'always' ],
        'import/no-named-as-default'   : 0,
        'no-console'                   : [ 'error', { allow: [ 'warn', 'error' ] }],
        'prefer-promise-reject-errors' : [ 'error', { allowEmptyReject: true }],
        'curly'                        : [ 'error', 'multi-or-nest', 'consistent' ],
        'spaced-comment'               : [ 'error', 'always' ],
        'comma-dangle'                 : [ 'error', 'always-multiline', { functions: 'never' }],
        'quote-props'                  : [ 'error', 'consistent-as-needed', { keywords: false }],
        'brace-style'                  : [ 'error', 'stroustrup', { allowSingleLine: true }],
        'indent'                       : [ 'error', 4, {
            SwitchCase               : 1,
            VariableDeclarator       : 'first',
            MemberExpression         : 1,
            FunctionDeclaration      : { parameters: 'first' },
            FunctionExpression       : { parameters: 'first' },
            CallExpression           : { arguments: 'first' },
            ArrayExpression          : 'first',
            ObjectExpression         : 'first',
            ImportDeclaration        : 'first',
            flatTernaryExpressions   : false,
            offsetTernaryExpressions : false,
            ignoreComments           : false,
        }],

        'no-trailing-spaces': [ 'error', {
            skipBlankLines: true,
        }],

        'eqeqeq'                  : [ 'error', 'always', { null: 'ignore' }],
        'func-call-spacing'       : [ 'error', 'never' ],
        'object-property-newline' : [ 'error', {
            allowAllPropertiesOnSameLine: true,
        }],

        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: [ 'return', 'break', 'continue', 'export', 'try', 'do', 'while' ] },
            { blankLine: 'any', prev: 'case', next: [ 'case', 'default' ] },
            { blankLine: 'always', prev: 'directive', next: '*' },
            { blankLine: 'never', prev: 'directive', next: 'directive' },
            { blankLine: 'always', prev: 'import', next: '*' },
            { blankLine: 'any', prev: 'import', next: 'import' },
        ],

        'array-bracket-spacing': [ 'error', 'always', {
            objectsInArrays : false,
            arraysInArrays  : true,
        }],

        'object-curly-spacing' : [ 'error', 'always' ],
        'space-in-parens'      : [ 'error', 'never', {
            exceptions: [ '[]', '{}', '()' ],
        }],

        'comma-spacing': [ 'error', {
            before : false,
            after  : true,
        }],

        'keyword-spacing': [ 'error', {
            before: true,
        }],

        'no-duplicate-imports' : 'error',
        'key-spacing'          : [ 'error', {
            singleLine: {
                beforeColon : false,
                afterColon  : true,
            },

            multiLine: {
                beforeColon : false,
                afterColon  : true,
            },

            align: {
                beforeColon : true,
                afterColon  : true,
                on          : 'colon',
                mode        : 'strict',
            },
        }],

        'switch-colon-spacing'    : [ 'error', { after: true, before: false }],
        'space-before-blocks'     : 'error',
        'no-multiple-empty-lines' : [ 'error', { max: 2, maxEOF: 0, maxBOF: 0 }],
        'padded-blocks'           : [ 'error', 'always', { allowSingleLineBlocks: true }],
        'semi'                    : [ 'error', 'never' ],

        // ember-suave

        'ember-suave/no-const-outside-module-scope'   : 'off',
        'ember-suave/require-access-in-comments'      : 'off',
        'ember-suave/lines-between-object-properties' : [ 'error', 'always', { exceptAfterSingleLine: true }],
    },
};
