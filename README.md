<div align="center">

# 🐬 Dolphinet Blockchain Explorer

**现代化的 EVM 区块链浏览器前端应用**

[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-3.15-319795)](https://chakra-ui.com/)

区块链浏览器前端，专为 Dolphinet 网络定制优化。

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [配置说明](#-配置说明) • [开发指南](#-开发指南) • [贡献](#-贡献)

</div>

---

## 📋 目录

- [功能特性](#-功能特性)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
  - [使用 Docker](#使用-docker)
  - [本地开发](#本地开发)
- [配置说明](#-配置说明)
- [项目结构](#-项目结构)
- [开发指南](#-开发指南)
- [贡献](#-贡献)
- [许可证](#-许可证)
- [相关链接](#-相关链接)

## ✨ 功能特性

### 🔍 核心功能
- **区块浏览** - 查看区块详情、交易列表和区块统计信息
- **交易查询** - 详细的交易信息、Gas 费用分析和交易状态追踪
- **地址查询** - 地址余额、交易历史、代币持有和 NFT 收藏
- **智能合约** - 合约代码查看、ABI 解析、合约验证和交互
- **代币管理** - ERC-20/ERC-721/ERC-1155 代币信息、转账记录和持有者列表
- **NFT 浏览** - NFT 集合、元数据展示和交易历史

### 🎨 用户体验
- **响应式设计** - 完美适配桌面端、平板和移动设备
- **深色模式** - 支持明暗主题切换，保护用户视力
- **实时更新** - WebSocket 实时同步最新区块和交易数据
- **高级搜索** - 支持地址、交易哈希、区块号等多种搜索方式
- **数据导出** - 支持 CSV 格式导出交易和地址数据
- **简洁界面** - 优化的布局设计，移除不必要的 UI 元素，提供更专注的浏览体验

### 🛠️ 开发者功能
- **GraphQL API** - 完整的 GraphQL API 文档和交互式查询界面
- **REST API** - 标准 RESTful API 文档和测试工具
- **合约验证** - 支持多种 Solidity 编译器版本的合约验证
- **ABI 解析** - 自动解析和展示合约函数和事件
- **交易解码** - 智能解码交易输入数据和事件日志

### 🔐 安全特性
- **地址验证** - 支持地址标签和验证系统
- **合约安全** - 集成安全扫描和风险提示
- **隐私保护** - 符合 GDPR 标准的隐私保护措施

## 🛠️ 技术栈

### 前端框架
- **[Next.js 15.2](https://nextjs.org/)** - React 全栈框架，支持 SSR 和 SSG
- **[React 18.3](https://reactjs.org/)** - 用户界面构建库
- **[TypeScript 5.4](https://www.typescriptlang.org/)** - 类型安全的 JavaScript

### UI 组件库
- **[Chakra UI 3.15](https://chakra-ui.com/)** - 模块化且可访问的组件库
- **[Emotion](https://emotion.sh/)** - CSS-in-JS 样式解决方案

### 状态管理与数据获取
- **[TanStack Query 5.55](https://tanstack.com/query)** - 强大的数据同步库
- **[React Hook Form](https://react-hook-form.com/)** - 高性能表单库

### Web3 集成
- **[Wagmi 2.14](https://wagmi.sh/)** - React Hooks 用于以太坊
- **[Viem 2.23](https://viem.sh/)** - 类型安全的以太坊库
- **[Reown AppKit](https://reown.com/)** - Web3 钱包连接

### 工具库
- **[Day.js](https://day.js.org/)** - 轻量级日期处理库
- **[BigNumber.js](https://mikemcl.github.io/bignumber.js/)** - 任意精度算术库
- **[D3.js](https://d3js.org/)** - 数据可视化库

## 🚀 快速开始

### 使用 Docker

最简单的方式是使用预构建的 Docker 镜像：

```bash
docker run -p 3000:3000 --env-file .env.local ghcr.io/blockscout/frontend:latest
```

或者使用自定义构建：

```bash
# 构建镜像
docker build -t dolphinet-explorer:latest .

# 运行容器
docker run -p 3000:3000 --env-file .env.local dolphinet-explorer:latest
```

### 本地开发

#### 前置要求

- **Node.js** 22.11.0 或更高版本
- **npm** 10.9.0 或更高版本（或 Yarn）
- **Git**

#### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/dolphinnet-labs/explorer-app.git
cd explorer-app
```

2. **安装依赖**

```bash
yarn install
# 或
npm install
```

3. **配置环境变量**

复制 `.env.example` 文件并创建 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，配置必要的环境变量。详细配置说明请参考 [环境变量文档](./docs/ENVS.md)。

**必需的环境变量：**

```env
NEXT_PUBLIC_APP_HOST=localhost
NEXT_PUBLIC_APP_PORT=3000
NEXT_PUBLIC_APP_PROTOCOL=http
NEXT_PUBLIC_API_HOST=localhost
NEXT_PUBLIC_API_PORT=4000
NEXT_PUBLIC_API_PROTOCOL=http
NEXT_PUBLIC_NETWORK_NAME=Dolphinet
NEXT_PUBLIC_NETWORK_ID=1
NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL=ETH
NEXT_PUBLIC_NETWORK_CURRENCY_NAME=Ether
```

4. **启动开发服务器**

**Windows 用户：**

使用 PowerShell 运行启动脚本（推荐）：

```powershell
.\start-dev.ps1
```

或者使用 Yarn：

```bash
yarn dev
```

**Linux/macOS 用户：**

```bash
yarn dev
# 或
npm run dev
```

应用将在 `http://localhost:3000` 启动（Windows 上默认使用端口 3002）。

> **注意：** Windows 用户如果遇到 Node.js 版本检查问题，启动脚本会自动使用 `--ignore-engines` 标志。

#### 其他有用的命令

```bash
# 构建 SVG 图标精灵
yarn svg:build-sprite

# 构建生产版本
yarn build

# 启动生产服务器
yarn start

# 运行代码检查
yarn lint:eslint

# 运行类型检查
yarn lint:tsc

# 运行测试
yarn test:jest

# 运行 Playwright 测试
yarn test:pw
```

#### Windows 开发注意事项

- 使用 `start-dev.ps1` 脚本可以自动处理开发环境配置
- 脚本会自动构建 SVG 图标精灵并设置必要的环境变量
- 如果遇到端口占用问题，可以修改脚本中的端口号
- 开发模式下会自动启用 CSP `unsafe-eval` 以支持 React Fast Refresh

## ⚙️ 配置说明

### 环境变量

应用通过环境变量进行配置。完整的配置选项请参考 [环境变量文档](./docs/ENVS.md)。

#### 主要配置类别

- **应用配置** - 应用基础设置（主机、端口、协议等）
- **API 配置** - 后端 API 连接设置
- **链配置** - 区块链网络信息（名称、ID、货币符号等）
- **UI 配置** - 界面定制（Logo、主题、导航等）
- **功能开关** - 启用或禁用特定功能

#### 示例配置

```env
# 应用配置
NEXT_PUBLIC_APP_HOST=explorer.dolphinet.io
NEXT_PUBLIC_APP_PORT=3000
NEXT_PUBLIC_APP_PROTOCOL=https

# API 配置
NEXT_PUBLIC_API_HOST=api.dolphinet.io
NEXT_PUBLIC_API_PORT=443
NEXT_PUBLIC_API_PROTOCOL=https

# 链配置
NEXT_PUBLIC_NETWORK_NAME=Dolphinet
NEXT_PUBLIC_NETWORK_ID=1
NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL=ETH
NEXT_PUBLIC_NETWORK_CURRENCY_NAME=Ether

# UI 配置
NEXT_PUBLIC_NETWORK_LOGO=/static/dolphinet-logo.png
NEXT_PUBLIC_NETWORK_ICON=/static/onlydol.png
```

### Logo 和品牌定制

项目支持自定义 Logo 和品牌元素：

1. 将 Logo 文件放置在 `public/static/` 目录
2. 在环境变量中配置路径：
   ```env
   NEXT_PUBLIC_NETWORK_LOGO=/static/dolphinet-logo.png
   NEXT_PUBLIC_NETWORK_ICON=/static/onlydol.png
   ```

## 📁 项目结构

```
explorer-app/
├── configs/              # 应用配置
│   ├── app/             # 主应用配置
│   └── envs/           # 环境变量配置
├── docs/                # 文档
│   ├── ENVS.md         # 环境变量文档
│   ├── CONTRIBUTING.md # 贡献指南
│   └── CUSTOM_BUILD.md # 自定义构建指南
├── lib/                 # 工具库和工具函数
├── pages/               # Next.js 页面路由
├── public/              # 静态资源
│   ├── static/         # Logo 和图片资源
│   └── icons/          # SVG 图标
├── toolkit/             # UI 组件库和主题
│   ├── chakra/         # Chakra UI 组件
│   └── theme/          # 主题配置
├── ui/                  # UI 组件
│   ├── pages/          # 页面组件
│   ├── shared/         # 共享组件
│   └── snippets/       # 片段组件
├── types/               # TypeScript 类型定义
├── next.config.js       # Next.js 配置
├── package.json         # 项目依赖
└── tsconfig.json        # TypeScript 配置
```

## 💻 开发指南

### 代码规范

项目使用 ESLint 和 TypeScript 进行代码质量检查：

```bash
# 检查代码
yarn lint:eslint

# 自动修复
yarn lint:eslint:fix

# 类型检查
yarn lint:tsc
```

### Git 工作流

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 提交规范

提交信息应遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 测试

```bash
# 运行单元测试
yarn test:jest

# 运行 E2E 测试
yarn test:pw

# 监听模式运行测试
yarn test:jest:watch
```

## 🤝 贡献

我们欢迎所有形式的贡献！请阅读我们的 [贡献指南](./docs/CONTRIBUTING.md) 了解详细信息。

### 贡献类型

- 🐛 **Bug 修复** - 修复已知问题
- ✨ **新功能** - 添加有价值的新功能
- 📝 **文档改进** - 完善文档和注释
- 🎨 **UI/UX 优化** - 改进用户界面和体验
- ⚡ **性能优化** - 提升应用性能

### 行为准则

请阅读我们的 [行为准则](./CODE_OF_CONDUCT.md)，确保为每个人创造一个友好和包容的环境。

## 📄 许可证

本项目采用 [GNU General Public License v3.0](LICENSE) 许可证。

```
Copyright (C) 2025 Dolphinet Labs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
```

## 🔗 相关链接

### 文档
- [环境变量配置](./docs/ENVS.md) - 完整的环境变量列表和说明
- [贡献指南](./docs/CONTRIBUTING.md) - 如何参与项目贡献
- [自定义构建](./docs/CUSTOM_BUILD.md) - 如何构建自定义 Docker 镜像

### 社区
- [提交 Issue](https://github.com/dolphinnet-labs/explorer-app/issues) - 报告问题或提出建议
- [讨论区](https://github.com/dolphinnet-labs/explorer-app/discussions) - 参与项目讨论

---

<div align="center">

**由 [Dolphinet Labs](https://github.com/dolphinnet-labs) 构建**

[⬆ 回到顶部](#-dolphinet-blockchain-explorer)

</div>
