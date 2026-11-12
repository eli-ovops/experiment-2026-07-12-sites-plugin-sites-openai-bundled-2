# 只读审查发现

- 技术栈：Next 16.2.6 / Vinext / React 19 / TypeScript / Tailwind CSS 4。
- 页面入口：`app/page.tsx`；当前仅 `app/layout.tsx`、`app/page.tsx`、`app/globals.css` 三个主要界面文件。
- 首页约 20 个 Section，重复使用标签、标题、说明、卡片矩阵结构。
- `app/page.tsx` 为单个 29KB 客户端组件；FAQ 是唯一状态交互。
- `app/globals.css` 约 32KB，主要使用 900px 与 620px 两档响应式规则。
- CTA 主要为 `mailto:`；没有 Pilot 表单、加载/成功/错误状态或重复提交保护。
- 没有真实图片 `<img>` / `Image`；Hero 为完整 Dashboard 模拟界面。
- 模拟 KPI、路线图、集成、安全矩阵、定价和买方场景使首页过长并稀释核心案例。
- 当前已有统一案例 East Corridor Conduit Reroute，但未真正贯穿所有模块。
- 已有 `prefers-reduced-motion` 基础规则，但焦点状态、44px 点击目标和 320px 宽度需要强化。
