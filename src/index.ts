import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import type { Linter } from "@typescript-eslint/utils/ts-eslint";
// @ts-expect-error eslint-plugin-react-hooks has no d.ts
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error eslint-plugin-react-refresh has no d.ts
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

type ConfigParams = {
    /**
     * using **typescript-eslint**
     * @default false
     */
    typescript?: boolean;

    /**
     * using **eslint-plugin-react-refresh** and **eslint-plugin-simple-import-sort**
     * @default false
     */
    react?: boolean;

    /**
     * using **@stylistic/eslint-plugin**
     * @default true
     */
    stylistic?: boolean;

    /**
     * using **eslint-plugin-simple-import-sort**
     * @default true
     */
    sortImport?: boolean;
};

export const typedConfig = tseslint.config;

export function eslintConfigXiaohj(params?: ConfigParams) {
    const defaultParams: Required<ConfigParams> = {
        typescript: false,
        react: false,
        stylistic: true,
        sortImport: true,
    };

    const mergedParams = Object.assign(defaultParams, params);

    const flatConfigArray: Linter.ConfigType[] = [
        js.configs.recommended,
    ];

    if (mergedParams.typescript) {
        flatConfigArray.push(
            ...tseslint.configs.recommended,
            {
                rules: {
                    "@typescript-eslint/no-explicit-any": "off",
                    "@typescript-eslint/no-unused-vars": "warn",
                },
            },
        );
    }

    if (mergedParams.react) {
        flatConfigArray.push({
            files: [
                "*.js",
                "*.jsx",
                "*.ts",
                "*.tsx",
            ],
            plugins: {
                "react-hooks": reactHooks,
                "react-refresh": reactRefresh,
            },
            rules: {
                ...reactHooks.configs.recommended.rules,
                "react-refresh/only-export-components": [
                    "warn",
                    { allowConstantExport: true },
                ],
            },
        });
    }

    if (mergedParams.stylistic) {
        flatConfigArray.push(stylistic.configs.customize({
            indent: 4,
            semi: true,
            quotes: "double",
        }));
    }

    if (mergedParams.sortImport) {
        flatConfigArray.push({
            plugins: {
                "simple-import-sort": simpleImportSort,
            },
            rules: {
                "simple-import-sort/imports": "warn",
                "simple-import-sort/exports": "warn",
            },
        });
    }

    return flatConfigArray;
}
