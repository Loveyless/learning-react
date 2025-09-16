import { useState } from "react";

export const Tailwindcss = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <input type="checkbox" className="peer" />
        <div className="hidden peer-checked:block p-8 font-sans space-y-12">
          {/* 1. group 状态依赖 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">1. `group` 状态依赖</h2>
            <p>当鼠标悬停在父元素上时，子元素的样式会发生变化。</p>
            <div className="group relative w-72 h-40 bg-gray-200 rounded-lg p-4 cursor-pointer">
              <p>将鼠标悬停在此卡片上</p>
              {/*
                工作原理:
                1. `group`: 在父元素上添加 `group` 类，相当于给它打上一个“标记”。
                2. `group-hover:{utility}`: 在子元素上使用 `group-hover:` 变体，
                   这个变体的意思是“当被标记为 `group` 的父元素处于 `hover` 状态时，
                   应用这些工具类”。
                这使得子元素可以根据父元素的状态来改变自己的样式，而无需 JavaScript。
              */}
              <div className="absolute bottom-4 left-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-6">
                <p className="text-lg font-bold text-blue-600">你好，`group` 状态！</p>
                <p className="text-sm text-gray-500">这是一个隐藏的宝藏。</p>
              </div>
            </div>
          </div>

          {/* 2. peer 状态依赖 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">2. `peer` 状态依赖</h2>
            <p>根据兄弟元素（如 `checkbox`）的状态来改变当前元素的样式。</p>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="peer-checkbox"
                className="peer h-6 w-6 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="peer-checkbox"
                className="text-lg text-gray-700 peer-checked:text-green-600 peer-checked:font-bold peer-checked:line-through"
              >
                {/*
                  工作原理:
                  1. `peer`: 在一个元素（如此处的 checkbox）上添加 `peer` 类，给它打上一个“标记”。
                  2. `peer-checked:{utility}`: 在它的 *后续兄弟元素* 上（如此处的 label），
                     使用 `peer-checked:` 变体。这个变体的意思是“当被标记为 `peer` 的前序兄弟元素
                     处于 `checked` 状态时，应用这些工具类”。
                  关键点在于“兄弟关系”和“顺序”，`peer` 状态只能影响它后面的兄弟元素。
                */}
                选中我，改变我的样式
              </label>
            </div>
          </div>

          {/* 3. 任意属性选择器 data-* */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">3. 任意属性选择器 `data-*`</h2>
            <p>常用于与 Radix UI 或 Headless UI 等无头组件库集成，根据 `data-state` 属性来应用样式。</p>
            <div>
              <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                {isOpen ? "关闭" : "打开"}
              </button>
              <div
                data-state={isOpen ? "open" : "closed"}
                className="mt-4 p-4 bg-gray-100 rounded-lg w-72 transition-all duration-300 data-[state=open]:bg-green-100 data-[state=closed]:opacity-0 data-[state=closed]:h-0 data-[state=open]:h-auto data-[state=open]:opacity-100"
              >
                {/*
                  工作原理:
                  `data-[state=open]:{utility}` 这种语法是 Tailwind 对原生 CSS 属性选择器的封装。
                  它会被编译成类似 `[data-state="open"] .data-\[state\=open\]\:bg-green-100 { ... }` 的 CSS 规则。
                  这允许你根据 HTML 元素的 `data-*` 属性动态地应用样式，
                  这对于和 React 组件状态或无头组件库（如 Radix）集成非常有用。
                */}
                <p className="data-[state=open]:text-green-800 data-[state=closed]:text-transparent">
                  这个面板的状态是：
                  <span className="font-bold">{isOpen ? "打开" : "关闭"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* 4. 直接为后代元素应用样式 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">4. 直接为后代元素应用样式 `[&_selector]`</h2>
            <p>无需为每个子元素单独添加类名，直接在父元素上为特定的后代元素（如 `p` 标签）指定样式。</p>
            <div className="p-4 bg-yellow-100 rounded-lg [&_p]:text-yellow-800 [&_p]:mb-2 [&_strong]:text-red-600">
              {/*
                工作原理:
                `[&_p]:{utility}` 这种语法是 Tailwind 提供的一个“逸出舱口”，
                它允许你编写类似原生 CSS 的选择器。`&` 符号代表当前元素。
                所以 `[&_p]:text-yellow-800` 会被直接编译成 `.\[\&\_p\]\:text-yellow-800 p { color: ... }`。
                这使得你可以在父元素上为所有后代 `p` 元素统一定义样式，
                而无需给每个 `p` 标签都加上类名，非常适合处理富文本内容或简化模板。
              */}
              <p>这段文本是黄色的，因为它是一个 `p` 标签。</p>
              <p>
                我也是黄色的，并且 <strong>这个加粗的文本</strong> 是红色的。
              </p>
              <div>
                <span>这个 span 不会受影响。</span>
                <p>但我这个嵌套的 p 标签依然会是黄色的。</p>
              </div>
            </div>
          </div>

          {/* 5. 文本渐变效果 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">5. 文本渐变效果</h2>
            <p>通过组合背景渐变、背景裁剪和文本透明来实现。</p>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {/*
                工作原理:
                这是一个经典的 CSS 技巧，通过三个属性的组合实现：
                1. `bg-gradient-to-r from-... to-...`: 创建一个渐变背景图像。
                2. `bg-clip-text`: 这是关键，它将元素的背景裁剪成文字的形状。
                   想象一下，背景还在，但只显示文字笔画覆盖住的部分。
                3. `text-transparent`: 将文字本身的颜色设为透明。
                组合起来的效果就是：文字变透明了，从而“透”出了它下方被裁剪成文字形状的渐变背景。
              */}
              你好，渐变世界！
            </h1>
          </div>

          {/* 
        6. 插件说明

        在实际工作中，Tailwind CSS 的生态系统非常强大，插件是其重要组成部分。
        - @tailwindcss/typography (`prose` 类): 
          当你需要渲染由 Markdown 生成的、没有 class 的原始 HTML 内容时，
          这个插件能提供非常美观的默认排版样式，极大提升内容的可读性。
          例如博客文章、文档页面等。

        - @tailwindcss/forms:
          这个插件可以重置并统一所有表单元素的样式，让你能用 `className`
          轻松地自定义它们，而不用担心跨浏览器的兼容性问题。
          它是构建现代化、一致性表单的必备工具。
      */}
          {/* 7. 命名 group (group/{name}) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{"7. 命名 `group` (`group/{name}`)"}</h2>
            <p>通过为 `group` 命名，可以精确控制嵌套层级中的样式触发，避免样式冲突。</p>
            <div className="group/item relative w-72 cursor-pointer rounded-lg bg-gray-200 p-4">
              <p>将鼠标悬停在菜单项上</p>
              {/*
                工作原理:
                1. `group/item`: 通过在 `group` 后面加上 `/` 和一个自定义名称（如 `item`），
                   我们为这个 `group` 进行了“命名”。
                2. `group-hover/item:{utility}`: 在子元素中，我们使用这个完整的命名 `group`
                   来指定状态依赖。
                这样做是为了解决 `group` 嵌套时产生的歧义。如果没有命名，
                内层的 `group-hover` 可能会错误地响应外层 `group` 的 `hover` 状态。
                命名确保了子元素只响应其对应的、特定命名的父 `group` 的状态。
              */}
              <div className="invisible absolute left-0 top-full mt-2 w-full rounded-md bg-white p-2 opacity-0 shadow-lg transition-all group-hover/item:visible group-hover/item:opacity-100">
                <a href="#" className="block px-3 py-1 text-gray-700 hover:bg-gray-100">
                  子菜单项 1
                </a>
                <a href="#" className="block px-3 py-1 text-gray-700 hover:bg-gray-100">
                  子菜单项 2
                </a>
              </div>
            </div>
          </div>

          {/* 8. aria-* 属性变体 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">8. `aria-*` 属性变体</h2>
            <p>根据 `aria` 属性（如 `aria-pressed`）的状态来应用样式，增强可访问性。</p>
            <button
              onClick={() => setPressed(!pressed)}
              aria-pressed={pressed}
              className="rounded-md bg-blue-500 px-4 py-2 text-black transition-colors aria-pressed:text-red-500 aria-pressed:bg-blue-700 aria-pressed:ring-2 aria-pressed:ring-blue-300"
            >
              {/*
                工作原理:
                与 `data-*` 属性变体非常相似，`aria-pressed:*` 变体也是对 CSS 属性选择器的封装。
                `aria-pressed:bg-blue-700` 会被编译成类似
                `[aria-pressed="true"] .aria-pressed\:bg-blue-700 { ... }` 的 CSS 规则。
                这使得我们可以根据 WAI-ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications)
                属性来设置样式，这对于构建具有良好可访问性（a11y）的 Web 应用至关重要。
              */}
              {pressed ? "已按下" : "未按下"}
            </button>
          </div>

          {/* 9. <details> 元素的 open 变体 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">9. `open` 变体（配合 `details` 元素）</h2>
            <p>无需 JavaScript 即可创建可折叠面板，并根据其 `open` 状态应用样式。</p>
            <details className="group w-72  rounded-lg bg-gray-50 p-4 open:bg-gray-300">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {/*
                  工作原理:
                  `<details>` 是一个 HTML 原生元素。当用户点击 `<summary>` 时，
                  浏览器会自动为 `<details>` 元素添加或移除 `open` 属性。
                  Tailwind 的 `open:` 变体正是利用了这一点，它会生成一个 CSS 选择器
                  `.open\:bg-gray-300[open] { ... }` 来监听这个 `open` 属性。
                  同时，这里也结合了 `group` 功能，当 `<details>` (被标记为 group)
                  处于 open 状态时，`group-open:rotate-90` 使得内部的 SVG 图标旋转。
                  这一切都不需要任何 JavaScript 代码。
                */}
                <span>点击展开</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <div className="mt-4 text-gray-600">这是折叠面板的内容。当面板打开时，父元素的背景色会改变，并且图标会旋转。</div>
            </details>
          </div>

          {/* 10. 任意变体 (Arbitrary Variants) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{"10. 任意变体 `[>selector]`"}</h2>
            <p>创建更复杂的选择器，例如实现斑马条纹列表。</p>
            <ul className="w-72 overflow-hidden rounded-lg border border-gray-200">
              <li className="px-4 py-2 [&:nth-child(odd)]:bg-gray-50 [&:nth-child(even)]:bg-white">
                {/*
                  工作原理:
                  这被称为“任意变体”，是 Tailwind 强大的自定义功能之一。
                  `[&:nth-child(odd)]` 语法允许你将几乎任何 CSS 选择器作为变体来使用。
                  `&` 符号代表应用该工具类的元素本身。
                  所以，`[&:nth-child(odd)]:bg-gray-50` 会被编译成
                  `.\[\&\:nth-child\(odd\)\]\:bg-gray-50:nth-child(odd) { ... }` 这样的 CSS 规则。
                  这让你能直接在 HTML 中使用复杂的伪类（如 :nth-child）或伪元素，
                  而无需编写单独的 CSS 文件或使用 `@apply`。
                */}
                第一项
              </li>
              <li className="px-4 py-2 [&:nth-child(odd)]:bg-gray-50 [&:nth-child(even)]:bg-white">第二项</li>
              <li className="px-4 py-2 [&:nth-child(odd)]:bg-gray-50 [&:nth-child(even)]:bg-white">第三项</li>
              <li className="px-4 py-2 [&:nth-child(odd)]:bg-gray-50 [&:nth-child(even)]:bg-white">第四项</li>
            </ul>
          </div>

          {/* 11. space-x-* / space-y-* (间距工具) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">11. `space-x-*` / `space-y-*` (间距工具)</h2>
            <p>为除了第一个子元素之外的所有子元素添加一致的间距。</p>
            <div className="flex space-x-4 rounded-lg bg-gray-100 p-4">
              {/*
                工作原理:
                `space-x-4` 会生成 `... > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem; }` 这样的 CSS。
                核心是 `~` (后续兄弟组合器)，它选择了所有非隐藏的、且前面有兄弟元素的元素，
                并为它们添加 `margin-left`，从而巧妙地跳过了第一个元素，实现了均匀间隔。
              */}
              <div className="h-12 w-12 rounded bg-blue-500"></div>
              <div className="h-12 w-12 rounded bg-blue-500"></div>
              <div className="h-12 w-12 rounded bg-blue-500"></div>
            </div>
          </div>

          {/* 12. divide-x-* / divide-y-* (分割线工具) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">12. `divide-x-*` / `divide-y-*` (分割线工具)</h2>
            <p>在子元素之间添加分割线，同样会自动跳过第一个元素。</p>
            <div className="flex divide-x divide-gray-300 rounded-lg bg-gray-100 p-4">
              {/*
                工作原理:
                与 `space-*` 非常相似，`divide-x` 也是使用后续兄弟组合器 `~`。
                但它不是添加 `margin`，而是通过为后续兄弟元素添加 `border-left`
                来创建分割线。可以通过 `divide-gray-300`, `divide-dashed` 等工具类来控制颜色、样式等。
              */}
              <a href="#" className="px-4 py-2 text-gray-700">
                链接 1
              </a>
              <a href="#" className="px-4 py-2 text-gray-700">
                链接 2
              </a>
              <a href="#" className="px-4 py-2 text-gray-700">
                链接 3
              </a>
            </div>
          </div>

          {/* 13. @tailwindcss/line-clamp (多行文本截断) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">13. `@tailwindcss/line-clamp` (多行文本截断)</h2>
            <p>将文本限制在指定行数内，超出部分显示省略号。</p>
            <div className="w-72 rounded-lg bg-gray-100 p-4">
              {/*
                工作原理:
                这是一个官方插件提供的功能。`line-clamp-3` 会生成必需的 CSS 属性组合：
                `-webkit-line-clamp: 3;`, `display: -webkit-box;`, `-webkit-box-orient: vertical;`, `overflow: hidden;`。
                这是实现跨浏览器多行文本截断的标准方案，需要安装并启用 `@tailwindcss/line-clamp` 插件。
              */}
              <p className="line-clamp-3 text-gray-700">
                这是一段非常非常长的文本，它本来会占据很多行的空间。但是，由于我们使用了 `line-clamp-3`
                这个神奇的工具类，它的显示将被限制在最多三行以内，任何超出这个范围的文本都会被优雅地截断并显示一个省略号。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tailwindcss;
