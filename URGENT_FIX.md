# 紧急修复指南：Vercel API 400错误

## 🚨 问题描述
Vercel部署后出现错误：
`GET https://explorer-testnet.dolphinode.world/api/v1/pages/main 400 (Bad Request)`

## 🔍 根本原因
- 前端尝试调用统计微服务API `/api/v1/pages/main`
- 该端点返回400错误，但前端仍然尝试调用
- 即使在代码中注释掉 `NEXT_PUBLIC_STATS_API_HOST`，统计功能仍被启用

## ✅ 解决方案

### 在 Vercel Dashboard 中执行：

1. **登录 Vercel Dashboard**
   - 访问：https://vercel.com/dashboard

2. **选择你的项目**
   - 点击你的 explorer-app 项目

3. **进入环境变量设置**
   - Settings → Environment Variables

4. **删除统计API变量**
   - 找到 `NEXT_PUBLIC_STATS_API_HOST`
   - 点击删除按钮 **完全移除** 这个变量
   - ⚠️ **重要**：不要注释，要完全删除！

5. **重新部署**
   - Vercel会自动检测更改并重新部署
   - 或者点击 'Deployments' → 'Redeploy'

## 🎯 修复效果

- ✅ **消除400错误**：不再调用有问题的API
- ✅ **使用主API**：统计数据来自 `/api/v2/stats`
- ✅ **保持功能**：基本统计功能仍然可用
- ✅ **性能优化**：减少失败的API调用

## 🔍 验证修复

修复后，检查：
1. 浏览器控制台不再有400错误
2. 首页统计数据正常加载
3. 应用整体功能正常

## 📞 需要帮助？

如果问题仍然存在，请检查：
- `NEXT_PUBLIC_STATS_API_HOST` 是否完全删除
- Vercel是否已重新部署
- 浏览器缓存是否已清除（Ctrl+F5）
