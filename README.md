# Grand View Garden (大观园)

Grand View Garden 是一款为城市漫步（CityWalk）爱好者设计的轻量级移动端应用。它结合了地图定位、路线推荐和个人行走记录功能，旨在为用户提供深度的城市探索体验。

## 核心功能

* **智能地图导览**：直观的地图界面，支持按咖啡、展览、自然等分类筛选周边兴趣点。
* **CityWalk 路线推荐**：精选路线，支持 AI 辅助定制，助你发现城市的隐秘角落。
* **游玩动态跟踪**：内置行走轨迹与步数统计，实时记录你的每一次探索。
* **手账生成**：每次路线完成后，自动生成专属的 CityWalk 手账，留存珍贵瞬间。

## 技术栈

本项目基于现代 Web 开发技术构建：

* **框架**: [Next.js 14](https://nextjs.org/)
* **语言**: [TypeScript](https://www.typescriptlang.org/)
* **动画**: [Framer Motion](https://www.framer.com/motion/)
* **图标库**: [Lucide React](https://lucide.dev/)
* **样式**: [Tailwind CSS](https://tailwindcss.com/)

## 项目结构

```text
├── app/              # 核心页面 (路由)
├── components/       # UI 可复用组件 (如 AI 推荐卡片)
├── hooks/            # 自定义业务逻辑 (如行走记录器)
├── public/           # 静态资源
└── tailwind.config.ts # Tailwind 样式配置
