//@ts-check

import { eslintConfigXiaohj, typedConfig } from './dist/index.js';

export default [
    ...eslintConfigXiaohj({
        typescript: true
    }),
    ...typedConfig({
        ignores: ["**/dist/**/*"]
    })
]
