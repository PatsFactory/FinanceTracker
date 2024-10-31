module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    ignorePatterns: ["projects/**/*", "environment.ts", "environment.prod.ts"],
    overrides: [
        {
            files: ["*.ts"],
            parserOptions: {
                project: ["tsconfig.json"],
                tsconfigRootDir: __dirname,
                createDefaultProgram: true
            },
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@angular-eslint/recommended",
                "plugin:@angular-eslint/template/process-inline-templates",
                "prettier"
            ],
            plugins: ["deprecation", "@stylistic"],
            rules: {
                "@angular-eslint/no-output-on-prefix": "error",
                "@angular-eslint/component-class-suffix": "error",
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
                "deprecation/deprecation": "warn",
                "@angular-eslint/component-selector": "off",
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
                "brace-style": ["error", "1tbs", { allowSingleLine: true }],
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
                "max-len": [2, { code: 140, ignorePattern: "^import .*" }],
                "@typescript-eslint/explicit-function-return-type": "error"
            }
        },
        {
            files: ["*.html"],
            extends: ["plugin:@angular-eslint/template/recommended", "prettier"],
            rules: {}
        }
    ]
};
