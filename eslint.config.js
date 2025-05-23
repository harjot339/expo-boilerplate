const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // react, react-native
            'index', // for styles like ./styles
            'internal', // @hooks, @utils
            ['parent', 'sibling'], // ../ and ./ other files
            'external', // third-party libs like react-i18next
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'react-native',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: './styles',
              group: 'index',
              position: 'after',
            },
            {
              pattern: '*.css',
              group: 'index',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-native'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'off', // Disable for Expo module resolvers
    },
  },
]);
