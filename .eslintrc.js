/*eslint-disable header/header*/
// Nau standard eslint rules, save it as .eslintrc.js
module.exports = {
	'root': true,
	'extends': [
		'nau-react',
	],
	'rules': {
		// 'header/header'               : [2, 'block', {'pattern': '^\\s?© 201\\d NauStud.io\\n\\s?\\* @author .*?'}],
		// these are specific loosen rules when we're still migrating from older styles
		'arrow-body-style'                  : 'off',
		'linebreak-style'                   : 'off',
		'comma-dangle'                      : 'off',
		'global-require'                    : 'off',
		'guard-for-in'                      : 'off',
		'import/first'                      : 'off',
		'import/prefer-default-export'      : 'off',
		'key-spacing'                       : 'off',
		'max-len'                           : 'off',
		'no-else-return'                    : 'off',
		'no-mixed-operators'                : 'off',
		'no-param-reassign'                 : 'off',
		'no-restricted-syntax'              : 'off',
		'no-use-before-define'              : 'off',
		'no-var'                            : 'warn',
		'object-curly-spacing'              : 'off',
		'object-shorthand'                  : 'warn',
		'prefer-arrow-callback'             : 'warn',
		'prefer-const'                      : 'warn',
		'prefer-template'                   : 'warn',
		'quote-props'                       : 'off',
		'react/prop-types'                  : 'warn',
		'react/no-array-index-key'          : 'warn',
		'react/jsx-boolean-value'           : 'warn',
		'react/jsx-space-before-closing'    : 'warn',
		'react/jsx-tag-spacing'             : ['warn', {
			closingSlash: 'never',
			beforeSelfClosing: 'always',
			afterOpening: 'never'
		}],
		'react/sort-comp'                   : 'warn',
		'react/forbid-prop-types'           : 'warn',
		'react/require-default-props'       : 'warn',
		'space-in-parens'                   : 'off',
		'spaced-comment'                    : 'off',
	},
	'globals': {AccountKit: true, window: true, document: true},
	'env': {
		es6: true,
		browser: true,
		node: true
	},
	'parser': 'babel-eslint',

	'plugins': [
		'babel',
		'header',
	],
	'settings': {
		'import/resolver': {
			'webpack': {
				'config': 'webpack.config.js'
			}
		}
	}
};
