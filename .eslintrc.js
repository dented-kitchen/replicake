module.exports = {
  'extends': 'airbnb-base',
  'parser': 'babel-eslint',
  'plugins': ['classPrivateMethods'],
  'rules': {
    'brace-style': ['error', 'stroustrup'],
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'max-len': 'off',
    'no-param-reassign': [2, { 'props': false }],
    'no-template-curly-in-string': 'off',
    'prefer-const': 'off',
    'prefer-destructuring': 'off',
    'prefer-object-spread': 'off',
    'quote-props': 'off',
  },
};
