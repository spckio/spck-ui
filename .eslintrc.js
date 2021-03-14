module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "$": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2015
  },
  "rules": {
    "no-fallthrough": 0,
    "no-console": 0,
    "no-cond-assign": 1,
    "no-constant-condition": 0,
    "no-irregular-whitespace": 0,
    "no-prototype-builtins": 0,
    "no-useless-escape": 1,
    "no-redeclare": [2, {"builtinGlobals": false}]
  }
};
