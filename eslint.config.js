// 导入 ESLint 的核心 JavaScript 规则。
import js from '@eslint/js';
// 导入预定义的全局变量，例如浏览器或 Node.js 环境中的全局变量。
import globals from 'globals';
// 导入 React Hooks 的 ESLint 插件，用于检查 Hooks 的使用规则。
import reactHooks from 'eslint-plugin-react-hooks';
// 导入 React Refresh 的 ESLint 插件，确保组件能正确支持热更新。
import reactRefresh from 'eslint-plugin-react-refresh';
// 导入 TypeScript 的 ESLint 解析器和规则集。
import tseslint from 'typescript-eslint';
// 从 ESLint 配置中导入全局忽略项。
import { globalIgnores } from 'eslint/config';

// 导出一个 ESLint 配置数组。`tseslint.config` 是一个辅助函数，用于简化配置创建。
export default tseslint.config([
  // 全局忽略 'dist' 目录，ESLint 将不会检查这个构建输出目录中的任何文件。
  globalIgnores(['dist']),
  {
    // 这个配置块适用于所有以 .ts 或 .tsx 结尾的文件。
    files: ['**/*.{ts,tsx}'],
    // `extends` 属性用于继承一系列预设的规则集。
    extends: [
      // 继承 ESLint 官方推荐的基础规则集。
      js.configs.recommended,
      // 继承 TypeScript-ESLint 推荐的规则集，用于 TypeScript 代码。
      tseslint.configs.recommended,
      // 继承 React Hooks 插件的最新推荐规则。
      reactHooks.configs['recommended-latest'],
      // 继承 React Refresh 插件针对 Vite 环境的配置。
      reactRefresh.configs.vite,
    ],
    rules: {
      // 关闭/no-explicit-any 检查，因为 TypeScript 中的 any 类型通常是合法的。
      '@typescript-eslint/no-explicit-any': 'off',
    },
    // `languageOptions` 用于配置语言相关的设置。
    languageOptions: {
      // 设置 ECMAScript 版本为 2020，以支持该年份的语法特性。
      ecmaVersion: 2020,
      // 设置全局变量，这里使用了 `globals.browser`，它包含了所有浏览器环境中的标准全局变量（如 `window`, `document`）。
      globals: globals.browser,
    },
  },
]);
