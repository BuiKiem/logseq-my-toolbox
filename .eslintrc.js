module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "import/prefer-default-export": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": "off",
  },
  globals: {
    logseq: "readonly",
    jest: "readonly",
  },
};
