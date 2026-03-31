# Personal Website

基于 CMSaasStarter 构建的个人网站系统，支持 Google Auth 登录和 Cloudflare Pages 部署。

## 功能

- 🏠 首页 - 个人介绍
- 📝 博客 - 文章发布
- 📬 联系表单
- 🔐 Google Auth 登录
- ☁️ Cloudflare Pages 部署

## 技术栈

- SvelteKit + adapter-cloudflare
- TailwindCSS + DaisyUI
- Supabase (Auth + Database)
- Google OAuth

## 部署

1. 配置 Supabase 并运行 `supabase/migrations/001_initial_schema.sql`
2. 在 Cloudflare Pages 连接 GitHub 仓库
3. 配置环境变量
4. 部署完成！
