import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      globals: {
        ...globals.node
      },
    },
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // ✅ Prettier Rules (no extends)
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'es5',
          printWidth: 100,
          arrowParens: 'always',
        }
      ],

      // ✅ Best Practices
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'prefer-const': 'error',
      'object-shorthand': ['error', 'always'],

      // ✅ Security Rules
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-process-exit': 'error',

      // ✅ Import Sorting (New Feature)
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    },
  },
];
