# operation-workbench
# 运营工作台 (Operation Workbench)

一站式智能运营支持平台，专为运营人员设计，集知识沉淀、策略赋能、工具提效于一体。

## 项目简介

运营工作台致力于为运营人员提供清晰的工作路径、高效的运营工具与可复用的实战经验，助力每一位运营者精准决策、高效执行、持续成长。

## 功能模块

| 模块 | 描述 |
|------|------|
| 新手指南 | 入职必读、系统介绍、常用工具、常见问题解答，帮助新人快速上手 |
| 外呼话术货架 | 标准话术模板、场景分类、话术技巧，提升沟通转化效果 |
| 运营策略集 | 运营方法论、策略方案、最佳实践，系统化运营思维 |
| 数据分析工具 | 数据可视化、报表生成、趋势分析、决策支持，用数据驱动运营 |
| 相关产品 | 各业务系统介绍、功能说明、使用教程，掌握核心工具 |
| 运营案例 | 典型案例复盘、经验总结、数据成果，从实践中学习 |

## 项目结构

```
help-site/
├── index.html              # 首页
├── 404.html                # 404 页面
├── server.js               # 本地开发服务器
├── package.json
├── modules/                # 各功能模块页面
│   ├── newcomer-guide.html
│   ├── call-scripts.html
│   ├── operation-strategies.html
│   ├── data-analysis.html
│   ├── related-products.html
│   └── operation-cases.html
├── css/                    # 样式文件
├── js/                     # 脚本文件
├── images/                 # 图片资源
├── icons/                  # 图标资源
├── assets/                 # 其他静态资源
└── docs-source/            # 文档素材（配图等）
```

## 快速开始

**环境要求：** Node.js

**安装依赖：**

```bash
npm install
```

**启动本地开发服务器：**

```bash
npm start
```

服务器将运行在 `http://localhost:8000`，同时支持局域网访问 `http://<本机IP>:8000`。

## 技术栈

- 纯静态 HTML / CSS / JavaScript
- Node.js 内置 `http` 模块（本地预览服务器）
- 无需构建工具，开箱即用

## 持续更新

本项目内容持续迭代中，欢迎提交 Issue 或 PR 参与共建。
