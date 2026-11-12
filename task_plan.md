# ClaimFlow 首页降噪重构计划

## 目标
在不部署、不推送远程、不读取密钥的前提下，将首页压缩为八个主要部分，以单一 East Corridor Conduit Reroute 案例贯穿，并交付本地审查 ZIP。

## 阶段
- [x] 阶段 1：只读审查
- [x] 阶段 2：结构调整
- [x] 阶段 3：视觉资产和版型
- [x] 阶段 4：响应式和无障碍
- [x] 阶段 5：最终审计与审查包

## 约束
- 不部署、不推送远程、不读取 .env 或密钥。
- 使用本地独立分支并保留旧首页副本。
- 当前能力、Assisted、Planned 必须明确区分。
- 表单为明确标注的本地 demo/mock submission。

## 错误记录
- `sips` 无法写入 WebP；改用本机已存在的 ffmpeg/libwebp 成功生成 1600×1200、135KB WebP。
- 原始测试仍断言已删除的 starter skeleton，产品构建和 lint 通过但测试失败；已将测试更新为 ClaimFlow SSR、真实性、表单、图片和响应式约束。
- `next/image` 在 Vinext 客户端开发运行时触发 React hook 错误；改回直接加载已压缩 WebP，并用文件级 lint 注释记录兼容性理由。
