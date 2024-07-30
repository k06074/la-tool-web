module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "next",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // TypeScript rules
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-interface": "off",

    // React rules
    "react/jsx-pascal-case": "error",
    "react/jsx-curly-brace-presence": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-key": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "arrow-function"],
        unnamedComponents: ["function-expression", "arrow-function"],
      },
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],

    // Prettier rules
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],

    // General JavaScript/ESLint rules
    "no-unused-vars": "off",
    "no-console": "warn",
    "no-restricted-imports": "off",
    "no-nested-ternary": "off",
    "no-use-before-define": "off",

    // Import rules
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/namespace": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "next/*",
            group: "external",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // TailwindCSS rules
    "tailwindcss/no-custom-classname": [
      "error",
      {
        whitelist: [
          // TODO: change regEx
          "^((bg|text|border|ring|divide|space|from|via|to)-)?(primary|gray|pointRed|pointBlue)\\-(50|[1-9]00|main)$",
        ],
      },
    ],
    "tailwindcss/classnames-order": "error",
  },
  overrides: [
    {
      files: ["src/components/ui/*"],
      rules: {
        "@typescript-eslint/no-empty-interface": "off",
        "tailwindcss/classnames-order": "off",
        "prettier/prettier": ["off", { semi: false }],
        "react/prop-types": "off",
        "tailwindcss/no-unnecessary-arbitrary-value": "off",
        "tailwindcss/no-custom-classname": "off",
      },
    },
    {
      files: ["tailwind.config.ts"],
      rules: {
        "global-require": "off",
      },
    },
  ],
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
      config: "tailwind.config.js",
    },
    next: {
      rootDir: ["."],
    },
  },
};
