<div align="center">

# 🐬 Dolphinet Blockchain Explorer

**Modern EVM Blockchain Explorer Frontend Application**

[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-3.15-319795)](https://chakra-ui.com/)

A blockchain explorer frontend built on [Blockscout](https://github.com/blockscout/blockscout), customized and optimized for the Dolphinet network.

[Features](#-features) • [Quick Start](#-quick-start) • [Configuration](#-configuration) • [Development](#-development) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
  - [Using Docker](#using-docker)
  - [Local Development](#local-development)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Related Links](#-related-links)

## ✨ Features

### 🔍 Core Features
- **Block Explorer** - View block details, transaction lists, and block statistics
- **Transaction Search** - Detailed transaction information, Gas fee analysis, and transaction status tracking
- **Address Lookup** - Address balance, transaction history, token holdings, and NFT collections
- **Smart Contracts** - Contract code viewing, ABI parsing, contract verification, and interaction
- **Token Management** - ERC-20/ERC-721/ERC-1155 token information, transfer records, and holder lists
- **NFT Browser** - NFT collections, metadata display, and transaction history

### 🎨 User Experience
- **Responsive Design** - Perfect adaptation for desktop, tablet, and mobile devices
- **Dark Mode** - Support for light/dark theme switching to protect user vision
- **Real-time Updates** - WebSocket real-time synchronization of latest blocks and transaction data
- **Advanced Search** - Support for multiple search types including addresses, transaction hashes, and block numbers
- **Data Export** - Support for CSV format export of transaction and address data

### 🛠️ Developer Features
- **GraphQL API** - Complete GraphQL API documentation and interactive query interface
- **REST API** - Standard RESTful API documentation and testing tools
- **Contract Verification** - Support for multiple Solidity compiler versions
- **ABI Parsing** - Automatic parsing and display of contract functions and events
- **Transaction Decoding** - Intelligent decoding of transaction input data and event logs

### 🔐 Security Features
- **Address Verification** - Support for address labeling and verification system
- **Contract Security** - Integrated security scanning and risk alerts
- **Privacy Protection** - GDPR-compliant privacy protection measures

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 15.2](https://nextjs.org/)** - React full-stack framework with SSR and SSG support
- **[React 18.3](https://reactjs.org/)** - User interface library
- **[TypeScript 5.4](https://www.typescriptlang.org/)** - Type-safe JavaScript

### UI Component Library
- **[Chakra UI 3.15](https://chakra-ui.com/)** - Modular and accessible component library
- **[Emotion](https://emotion.sh/)** - CSS-in-JS styling solution

### State Management & Data Fetching
- **[TanStack Query 5.55](https://tanstack.com/query)** - Powerful data synchronization library
- **[React Hook Form](https://react-hook-form.com/)** - High-performance form library

### Web3 Integration
- **[Wagmi 2.14](https://wagmi.sh/)** - React Hooks for Ethereum
- **[Viem 2.23](https://viem.sh/)** - Type-safe Ethereum library
- **[Reown AppKit](https://reown.com/)** - Web3 wallet connection

### Utility Libraries
- **[Day.js](https://day.js.org/)** - Lightweight date processing library
- **[BigNumber.js](https://mikemcl.github.io/bignumber.js/)** - Arbitrary precision arithmetic library
- **[D3.js](https://d3js.org/)** - Data visualization library

## 🚀 Quick Start

### Using Docker

The easiest way is to use the pre-built Docker image:

```bash
docker run -p 3000:3000 --env-file .env.local ghcr.io/blockscout/frontend:latest
```

Or build a custom image:

```bash
# Build image
docker build -t dolphinet-explorer:latest .

# Run container
docker run -p 3000:3000 --env-file .env.local dolphinet-explorer:latest
```

### Local Development

#### Prerequisites

- **Node.js** 22.11.0 or higher
- **npm** 10.9.0 or higher (or Yarn)
- **Git**

#### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/dolphinnet-labs/explorer-app.git
cd explorer-app
```

2. **Install dependencies**

```bash
yarn install
# or
npm install
```

3. **Configure environment variables**

Copy the `.env.example` file and create `.env.local`:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file and configure the necessary environment variables. For detailed configuration instructions, please refer to the [Environment Variables Documentation](./docs/ENVS.md).

**Required environment variables:**

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

4. **Start the development server**

```bash
yarn dev
# or
npm run dev
```

The application will start at `http://localhost:3000`.

#### Other Useful Commands

```bash
# Build production version
yarn build

# Start production server
yarn start

# Run code linting
yarn lint:eslint

# Run type checking
yarn lint:tsc

# Run tests
yarn test:jest

# Run Playwright tests
yarn test:pw
```

## ⚙️ Configuration

### Environment Variables

The application is configured through environment variables. For a complete list of configuration options, please refer to the [Environment Variables Documentation](./docs/ENVS.md).

#### Main Configuration Categories

- **App Configuration** - Basic application settings (host, port, protocol, etc.)
- **API Configuration** - Backend API connection settings
- **Chain Configuration** - Blockchain network information (name, ID, currency symbol, etc.)
- **UI Configuration** - Interface customization (Logo, theme, navigation, etc.)
- **Feature Flags** - Enable or disable specific features

#### Example Configuration

```env
# App Configuration
NEXT_PUBLIC_APP_HOST=explorer.dolphinet.io
NEXT_PUBLIC_APP_PORT=3000
NEXT_PUBLIC_APP_PROTOCOL=https

# API Configuration
NEXT_PUBLIC_API_HOST=api.dolphinet.io
NEXT_PUBLIC_API_PORT=443
NEXT_PUBLIC_API_PROTOCOL=https

# Chain Configuration
NEXT_PUBLIC_NETWORK_NAME=Dolphinet
NEXT_PUBLIC_NETWORK_ID=1
NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL=ETH
NEXT_PUBLIC_NETWORK_CURRENCY_NAME=Ether

# UI Configuration
NEXT_PUBLIC_NETWORK_LOGO=/static/dolphinet-logo.png
NEXT_PUBLIC_NETWORK_ICON=/static/onlydol.png
```

### Logo and Branding Customization

The project supports custom logos and branding elements:

1. Place logo files in the `public/static/` directory
2. Configure paths in environment variables:
   ```env
   NEXT_PUBLIC_NETWORK_LOGO=/static/dolphinet-logo.png
   NEXT_PUBLIC_NETWORK_ICON=/static/onlydol.png
   ```

## 📁 Project Structure

```
explorer-app/
├── configs/              # Application configuration
│   ├── app/             # Main application config
│   └── envs/           # Environment variable config
├── docs/                # Documentation
│   ├── ENVS.md         # Environment variables documentation
│   ├── CONTRIBUTING.md # Contribution guide
│   └── CUSTOM_BUILD.md # Custom build guide
├── lib/                 # Utility libraries and functions
├── pages/               # Next.js page routes
├── public/              # Static assets
│   ├── static/         # Logo and image resources
│   └── icons/          # SVG icons
├── toolkit/             # UI component library and theme
│   ├── chakra/         # Chakra UI components
│   └── theme/          # Theme configuration
├── ui/                  # UI components
│   ├── pages/          # Page components
│   ├── shared/         # Shared components
│   └── snippets/       # Snippet components
├── types/               # TypeScript type definitions
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## 💻 Development

### Code Standards

The project uses ESLint and TypeScript for code quality checks:

```bash
# Check code
yarn lint:eslint

# Auto-fix
yarn lint:eslint:fix

# Type checking
yarn lint:tsc
```

### Git Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Submit a Pull Request

### Commit Convention

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation updates
- `style:` Code formatting changes
- `refactor:` Code refactoring
- `test:` Test-related changes
- `chore:` Build process or auxiliary tool changes

### Testing

```bash
# Run unit tests
yarn test:jest

# Run E2E tests
yarn test:pw

# Run tests in watch mode
yarn test:jest:watch
```

## 🤝 Contributing

We welcome all forms of contributions! Please read our [Contribution Guide](./docs/CONTRIBUTING.md) for details.

### Types of Contributions

- 🐛 **Bug Fixes** - Fix known issues
- ✨ **New Features** - Add valuable new features
- 📝 **Documentation Improvements** - Improve documentation and comments
- 🎨 **UI/UX Enhancements** - Improve user interface and experience
- ⚡ **Performance Optimizations** - Enhance application performance

### Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to ensure we create a friendly and inclusive environment for everyone.

## 📄 License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

```
Copyright (C) 2024 Dolphinet Labs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
```

## 🔗 Related Links

### Documentation
- [Environment Variables Configuration](./docs/ENVS.md) - Complete list of environment variables and descriptions
- [Contribution Guide](./docs/CONTRIBUTING.md) - How to contribute to the project
- [Custom Build](./docs/CUSTOM_BUILD.md) - How to build custom Docker images

### Related Projects
- [Blockscout Backend](https://github.com/blockscout/blockscout) - Blockchain explorer backend
- [Blockscout Frontend](https://github.com/blockscout/frontend) - Original frontend project

### Community
- [Submit Issue](https://github.com/dolphinnet-labs/explorer-app/issues) - Report issues or make suggestions
- [Discussions](https://github.com/dolphinnet-labs/explorer-app/discussions) - Participate in project discussions

---

<div align="center">

**Built with ❤️ by [Dolphinet Labs](https://github.com/dolphinnet-labs)**

[⬆ Back to Top](#-dolphinet-blockchain-explorer)

</div>

