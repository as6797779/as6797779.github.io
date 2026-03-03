<template>
  <div class="app-container">
    <!-- 左侧导航栏组件 -->
    <Sidebar />
    <!-- 右侧内容区（路由渲染区域） -->
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// 导入左侧导航组件
import Sidebar from './components/Sidebar.vue'

//公共方法
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  // 替换 T 为空格，并去除毫秒部分（如果有）
  return dateStr.replace('T', ' ').split('.')[0]
}
</script>

<style scoped>
/* 整体容器 */
.app-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

/* 右侧内容区 */
.content-wrapper {
  flex: 1; /* 占满剩余宽度 */
  margin-left: 200px; /* 给左侧导航留空间 */
  padding: 30px;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>