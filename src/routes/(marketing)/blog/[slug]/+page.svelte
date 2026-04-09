<script lang="ts">
    import { locale, t } from '$lib/i18n';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { env } from '$env/dynamic/public';

    interface BlogPost {
        id: string;
        title: string;
        content: string;
        excerpt: string;
        created_at: string;
        updated_at: string;
        tags: string[];
        cover_image?: string;
        published: boolean;
    }

    let post: BlogPost | null = null;
    let loading = true;
    let error = '';

    // Demo posts for when Supabase is not configured
    function getDemoPosts(): Record<string, BlogPost> {
        const isEn = $locale === 'en';
        return {
        '1': {
            id: '1',
            title: $locale === 'en' ? 'Building Scalable Backend Systems with Go' : '使用 Go 构建可扩展后端系统',
            excerpt: $locale === 'en' 
                ? 'A deep dive into designing and implementing scalable backend architectures using Go, Docker, and Kubernetes.'
                : '深入探讨使用 Go、Docker 和 Kubernetes 设计和实现可扩展的后端架构。',
            content: $locale === 'en' ? `
# Building Scalable Backend Systems with Go

## Introduction

Building scalable backend systems is crucial for modern applications. In this article, we'll explore how to design and implement robust backend architectures using Go.

## Why Go?

Go is an excellent choice for backend development because:

1. **Performance**: Go compiles to native machine code, offering excellent performance
2. **Concurrency**: Built-in goroutines make concurrent programming simple
3. **Reliability**: Strong typing and memory safety
4. **Simplicity**: Clean syntax that's easy to read and maintain

## Architecture Design

When designing a scalable system, consider:

- **Microservices Architecture**: Break down your application into smaller, independent services
- **Load Balancing**: Distribute traffic across multiple instances
- **Caching**: Use Redis or Memcached for frequently accessed data
- **Database Sharding**: Distribute data across multiple databases

## Docker & Kubernetes

Containerization with Docker and orchestration with Kubernetes allow you to:

- Package your application with all dependencies
- Scale automatically based on demand
- Deploy consistently across environments
- Achieve high availability

## Conclusion

Building scalable systems requires careful planning and the right tools. Go, Docker, and Kubernetes form a powerful combination for modern backend development.
            ` : `
# 使用 Go 构建可扩展后端系统

## 引言

构建可扩展的后端系统对现代应用至关重要。在本文中，我们将探讨如何使用 Go 设计和实现健壮的后端架构。

## 为什么选择 Go？

Go 是后端开发的绝佳选择，因为：

1. **性能**：Go 编译为原生机器码，提供卓越性能
2. **并发**：内置 goroutine 使并发编程变得简单
3. **可靠性**：强类型和内存安全
4. **简洁性**：清晰的语法，易于阅读和维护

## 架构设计

设计可扩展系统时，请考虑：

- **微服务架构**：将应用拆分为更小、独立的服务
- **负载均衡**：跨多个实例分发流量
- **缓存**：使用 Redis 或 Memcached 缓存频繁访问的数据
- **数据库分片**：跨多个数据库分发数据

## Docker 与 Kubernetes

使用 Docker 容器化和 Kubernetes 编排，您可以：

- 将应用与所有依赖项打包
- 根据需求自动扩展
- 跨环境一致部署
- 实现高可用性

## 结论

构建可扩展系统需要仔细规划和正确的工具。Go、Docker 和 Kubernetes 构成了现代后端开发的强大组合。
            `,
            created_at: '2026-03-15T10:00:00Z',
            updated_at: '2026-03-15T10:00:00Z',
            tags: ['Go', 'Backend', 'DevOps'],
            published: true
        },
        '2': {
            id: '2',
            title: $locale === 'en' ? 'AI Agent Workflows with OpenClaw' : '使用 OpenClaw 构建 AI 智能体工作流',
            excerpt: $locale === 'en'
                ? 'How I built autonomous AI agent workflows using OpenClaw and Claude Code for automated task execution.'
                : '如何使用 OpenClaw 和 Claude Code 构建自主 AI 智能体工作流实现自动化任务执行。',
            content: $locale === 'en' ? `
# AI Agent Workflows with OpenClaw

## Overview

OpenClaw is a powerful platform for building autonomous AI agent workflows. In this article, I'll share how I use it to automate complex tasks.

## What is OpenClaw?

OpenClaw is an AI agent orchestration platform that allows you to:

- Define autonomous agents with specific capabilities
- Create workflows that connect multiple agents
- Integrate with external tools and APIs
- Monitor and debug agent execution

## Key Features

### 1. Skill System

OpenClaw's skill system allows you to extend agent capabilities with specialized functions.

### 2. Memory Management

Agents can maintain context across conversations using persistent memory.

### 3. Tool Integration

Connect agents to external tools like browsers, file systems, and APIs.

## My Workflow

I use OpenClaw for:

- Automated code reviews
- Documentation generation
- Bug detection and reporting
- Performance monitoring

## Conclusion

OpenClaw combined with Claude Code provides a powerful foundation for building intelligent automation systems.
            ` : `
# 使用 OpenClaw 构建 AI 智能体工作流

## 概述

OpenClaw 是一个强大的 AI 智能体编排平台，用于构建自主工作流。在本文中，我将分享如何使用它来自动化复杂任务。

## 什么是 OpenClaw？

OpenClaw 是一个 AI 智能体编排平台，允许您：

- 定义具有特定能力的自主智能体
- 创建连接多个智能体的工作流
- 集成外部工具和 API
- 监控和调试智能体执行

## 核心功能

### 1. 技能系统

OpenClaw 的技能系统允许您使用专业函数扩展智能体能力。

### 2. 内存管理

智能体可以使用持久化内存在对话之间维护上下文。

### 3. 工具集成

将智能体连接到浏览器、文件系统和 API 等外部工具。

## 我的工作流

我将 OpenClaw 用于：

- 自动化代码审查
- 文档生成
- 缺陷检测和报告
- 性能监控

## 结论

OpenClaw 与 Claude Code 结合为构建智能自动化系统提供了强大基础。
            `,
            created_at: '2026-03-10T10:00:00Z',
            updated_at: '2026-03-10T10:00:00Z',
            tags: ['AI', 'OpenClaw', 'Automation'],
            published: true
        },
        '3': {
            id: '3',
            title: $locale === 'en' ? 'DevOps Best Practices for Small Teams' : '小团队 DevOps 最佳实践',
            excerpt: $locale === 'en'
                ? 'Practical DevOps strategies and tools that helped our small team achieve enterprise-level deployment automation.'
                : '实用的 DevOps 策略和工具，帮助我们的小团队实现企业级部署自动化。',
            content: $locale === 'en' ? `
# DevOps Best Practices for Small Teams

## Introduction

Small teams often struggle with DevOps due to limited resources. Here are practical strategies that work.

## Core Principles

### 1. Automate Everything

Automate repetitive tasks:
- Testing
- Building
- Deployment
- Monitoring

### 2. Infrastructure as Code

Use tools like Terraform or Ansible to manage infrastructure declaratively.

### 3. CI/CD Pipelines

Set up continuous integration and deployment using:
- GitHub Actions
- GitLab CI
- Jenkins

## Tools I Recommend

| Category | Tool |
|----------|------|
| Container | Docker |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions |
| Monitoring | Prometheus + Grafana |
| Logging | ELK Stack |

## Lessons Learned

1. Start simple, iterate later
2. Document everything
3. Monitor everything
4. Automate testing first

## Conclusion

Good DevOps practices aren't just for big companies. Small teams can achieve a lot with the right strategies.
            ` : `
# 小团队 DevOps 最佳实践

## 引言

小团队由于资源有限，往往在 DevOps 方面遇到困难。这里有一些行之有效的实用策略。

## 核心原则

### 1. 一切自动化

自动化重复任务：
- 测试
- 构建
- 部署
- 监控

### 2. 基础设施即代码

使用 Terraform 或 Ansible 等工具声明式管理基础设施。

### 3. CI/CD 流水线

使用以下工具设置持续集成和部署：
- GitHub Actions
- GitLab CI
- Jenkins

## 推荐工具

| 类别 | 工具 |
|------|------|
| 容器化 | Docker |
| 编排 | Kubernetes |
| CI/CD | GitHub Actions |
| 监控 | Prometheus + Grafana |
| 日志 | ELK Stack |

## 经验教训

1. 从简单开始，后续迭代
2. 记录一切
3. 监控一切
4. 首先自动化测试

## 结论

良好的 DevOps 实践不只是大公司的专利。小团队只要策略得当，也能取得很大成就。
            `,
            created_at: '2026-03-05T10:00:00Z',
            updated_at: '2026-03-05T10:00:00Z',
            tags: ['DevOps', 'Docker', 'CI/CD'],
            published: true
        }
    };
    }

    $: demoPosts = getDemoPosts();

    onMount(async () => {
        const slug = $page.params.slug;
        const supabaseUrl = env.PUBLIC_SUPABASE_URL || '';
        const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || '';
        
        if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co') {
            // Use demo posts
            post = demoPosts[slug] || null;
            loading = false;
            return;
        }

        try {
            const response = await fetch(
                `${supabaseUrl}/rest/v1/posts?id=eq.${slug}&select=*&published=eq.true`, 
                {
                    headers: {
                        'apikey': supabaseAnonKey,
                        'Authorization': `Bearer ${supabaseAnonKey}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                post = data.length > 0 ? data[0] : null;
            } else {
                error = 'Failed to fetch post';
            }
        } catch (e) {
            error = 'Failed to connect to database';
        } finally {
            loading = false;
        }
    });

    function formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString($locale === 'en' ? 'en-US' : 'zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function renderMarkdown(content: string): string {
        // Simple markdown to HTML conversion
        return content
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-white mt-8 mb-4">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-white mt-10 mb-5">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-12 mb-6">$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-gray-300 mb-2">$1</li>')
            .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-gray-300 mb-2">$1</li>')
            .replace(/\n/gim, '<br />')
            .replace(/\|(.*)\|/gim, (match) => {
                const cells = match.split('|').filter(c => c.trim());
                if (cells.some(c => c.includes('---'))) return '';
                return `<tr class="border-b border-gray-700">${cells.map(c => `<td class="py-2 px-4 text-gray-300">${c.trim()}</td>`).join('')}</tr>`;
            });
    }
</script>

<svelte:head>
    <title>{post?.title || 'Article'} - Cesar Cai</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-20">
    {#if loading}
        <!-- Loading State -->
        <div class="animate-pulse space-y-6">
            <div class="h-4 bg-gray-700 rounded w-1/4"></div>
            <div class="h-10 bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-700 rounded w-1/2"></div>
            <div class="h-64 bg-gray-700 rounded"></div>
        </div>
    {:else if error}
        <!-- Error State -->
        <div class="text-center py-20">
            <p class="text-red-400 mb-4">{error}</p>
            <a href="/blog" class="text-emerald-400 hover:text-emerald-300">
                ← {$t('article.back')}
            </a>
        </div>
    {:else if post}
        <!-- Article -->
        <article class="space-y-8">
            <!-- Back Link -->
            <a href="/blog" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                ← {$t('article.back')}
            </a>

            <!-- Header -->
            <header class="space-y-4">
                <div class="flex items-center gap-3 text-sm text-gray-500">
                    {#if post.tags && post.tags.length > 0}
                        <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium">
                            {post.tags[0]}
                        </span>
                        <span class="w-1 h-1 rounded-full bg-gray-600"></span>
                    {/if}
                    <span>{$t('article.published')} {formatDate(post.created_at)}</span>
                </div>

                <h1 class="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {post.title}
                </h1>

                {#if post.excerpt}
                    <p class="text-xl text-gray-400 leading-relaxed">
                        {post.excerpt}
                    </p>
                {/if}
            </header>

            <!-- Content -->
            <div class="prose prose-invert prose-emerald max-w-none">
                <div class="text-gray-300 leading-relaxed space-y-4">
                    {@html renderMarkdown(post.content)}
                </div>
            </div>

            <!-- Tags -->
            {#if post.tags && post.tags.length > 0}
                <div class="flex flex-wrap gap-2 pt-8 border-t border-gray-800">
                    {#each post.tags as tag}
                        <span class="px-3 py-1 bg-gray-900/50 text-gray-400 text-sm rounded-full border border-gray-700">
                            {tag}
                        </span>
                    {/each}
                </div>
            {/if}
        </article>
    {:else}
        <!-- Not Found -->
        <div class="text-center py-20">
            <h1 class="text-3xl font-bold text-white mb-4">Post not found</h1>
            <p class="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
            <a href="/blog" class="text-emerald-400 hover:text-emerald-300">
                ← {$t('article.back')}
            </a>
        </div>
    {/if}
</div>
