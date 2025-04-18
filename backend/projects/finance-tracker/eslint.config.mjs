import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import deprecate from "eslint-plugin-deprecate";
import stylistic from "@stylistic/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        files: ["**/*.ts"]
    },
    {
        ignores: [
            "projects/**/*",
            "**/environment.ts",
            "**/environment.prod.ts",
            "**/node_modules",
            "**/dist",
            "**/tools",
            "src/api",
            "src/main.ts"
        ]
    },
    {
        plugins: {
            "@typescript-eslint": typescriptEslint
        },

        languageOptions: {
            parser: tsParser
        }
    },
    ...compat
        .extends("eslint:recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended", "prettier")
        .map((config) => ({
            ...config,
            files: ["**/*.ts"]
        })),
    {
        files: ["**/*.ts"],

        plugins: {
            deprecate,
            "@stylistic": stylistic
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "module",

            parserOptions: {
                project: "tsconfig.json",
                tsconfigRootDir: ""
            }
        },

        rules: {
            "@typescript-eslint/dot-notation": "error",

            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "default",
                    format: ["camelCase"],
                    leadingUnderscore: "allow"
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"]
                },
                {
                    selector: "enumMember",
                    format: ["camelCase", "UPPER_CASE"]
                },
                {
                    selector: "objectLiteralProperty",
                    format: null
                }
            ],

            "@typescript-eslint/no-this-alias": "error",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/prefer-readonly": "error",
            "object-shorthand": "error",
            "arrow-body-style": "error",
            "prefer-spread": "error",
            "prefer-const": "error",
            "deprecate/import": "warn",
            "deprecate/member-expression": "warn",
            "deprecate/function": "warn",
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/prefer-for-of": "off",
            "no-underscore-dangle": "off",
            "prefer-arrow/prefer-arrow-functions": "off",
            "no-unused-expressions": "off",
            "import/no-default-export": "off",

            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                {
                    accessibility: "explicit",

                    overrides: {
                        constructors: "off"
                    }
                }
            ],

            "@typescript-eslint/no-empty-function": "error",

            "@stylistic/quotes": [
                "error",
                "double",
                {
                    allowTemplateLiterals: true,
                    avoidEscape: true
                }
            ],

            "@typescript-eslint/triple-slash-reference": "error",

            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                    allowTernary: true
                }
            ],

            "keyword-spacing": "error",
            "arrow-parens": ["error", "always"],

            "brace-style": [
                "error",
                "1tbs",
                {
                    allowSingleLine: true
                }
            ],

            semi: "off",
            "@stylistic/semi": ["error"],
            "comma-dangle": "error",
            "default-case": "error",
            "no-empty": "error",
            "no-redeclare": "error",
            "@typescript-eslint/member-ordering": ["warn"],

            "space-before-function-paren": [
                "error",
                {
                    anonymous: "always",
                    named: "never",
                    asyncArrow: "always"
                }
            ],

            "max-len": [
                2,
                {
                    code: 140,
                    ignorePattern: "^import .*"
                }
            ],

            "@typescript-eslint/explicit-function-return-type": "error"
        }
    },
    ...compat.extends("prettier").map((config) => ({
        ...config,
        files: ["**/*.html"]
    })),
    {
        files: ["**/*.html"],
        rules: {}
    }
];
