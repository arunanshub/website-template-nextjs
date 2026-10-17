/**
@type {import("prettier").Config}
*/
const config = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss', // must be last
  ],

  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,

  // Tailwind v4 — point at the CSS entry that contains @import "tailwindcss"
  tailwindStylesheet: './app/globals.css',
  // Sort classes inside cn() / cva() calls
  tailwindFunctions: ['cn', 'cva', 'clsx'],

  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$', // project alias
    '^[./]', // relative
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  overrides: [
    {
      files: '*.mdx',
      options: {
        parser: 'mdx',
      },
    },
  ],
}

export default config
