<template>
  <div class="sidebar">
    <!-- 导航菜单列表 -->
    <ul class="menu-list">
      <!-- 教育广场 -->
      <li class="menu-item">
        <!-- 一级导航标题（可点击跳转） -->
        <div 
          class="menu-title" 
          @click="handleTitleClick('educationHome')"
        >
          <span>教育广场</span>
          <!-- 展开/折叠箭头（普通大于号，避免特殊字符问题） -->
          <i 
            class="arrow-icon" 
            :class="{ active: isEducationOpen }"
            @click.stop="isEducationOpen = !isEducationOpen"
          >
            >
          </i>
        </div>
        <!-- 子菜单（展开时显示） -->
        <ul 
          class="submenu-list" 
          v-show="isEducationOpen"
        >
          <li 
            class="submenu-item"
            :class="{ active: $route.name === 'educationHome' }"
            @click="handleSubmenuClick('educationHome')"
          >
            教育首页
          </li>
          <li 
            class="submenu-item"
            :class="{ active: $route.name === 'educationCourse' }"
            @click="handleSubmenuClick('educationCourse')"
          >
            课程中心
          </li>
          <li 
            class="submenu-item"
            :class="{ active: $route.name === 'educationLive' }"
            @click="handleSubmenuClick('educationLive')"
          >
            直播课堂
          </li>
        </ul>
      </li>

      <!-- 写作广场 -->
      <li class="menu-item">
        <div 
          class="menu-title" 
          @click="handleTitleClick('writingHome')"
        >
          <span>写作广场</span>
          <i 
            class="arrow-icon" 
            :class="{ active: isWritingOpen }"
            @click.stop="isWritingOpen = !isWritingOpen"
          >
            >
          </i>
        </div>
        <ul 
          class="submenu-list" 
          v-show="isWritingOpen"
        >
          <li 
            class="submenu-item"
            :class="{ active: $route.name === 'writingHome' }"
            @click="handleSubmenuClick('writingHome')"
          >
            写作首页
          </li>
          <li 
            class="submenu-item"
            :class="{ active: $route.name === 'writingEssay' }"
            @click="handleSubmenuClick('writingEssay')"
          >
            散文创作
          </li>
          <li 
            class="submenu-item"
            :class="{ active: $route.name === 'writingPoem' }"
            @click="handleSubmenuClick('writingPoem')"
          >
            诗歌创作
          </li>
          <li 
            class="submenu-item"
            :class="{ active: $route.name === 'writingNovel' }"
            @click="handleSubmenuClick('writingNovel')"
          >
            小说创作
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 必须的脚本标签，引入依赖并定义逻辑
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 初始化路由实例
const router = useRouter()

// 控制子菜单展开/折叠状态（响应式变量）
const isEducationOpen = ref(false)
const isWritingOpen = ref(false)

// 点击一级标题跳转并展开对应子菜单
const handleTitleClick = (routeName) => {
  router.push({ name: routeName })
  // 切换子菜单展开状态
  if (routeName.includes('education')) {
    isEducationOpen.value = true
    isWritingOpen.value = false
  } else {
    isWritingOpen.value = true
    isEducationOpen.value = false
  }
}

// 点击子菜单跳转
const handleSubmenuClick = (routeName) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
/* 左侧导航栏整体样式 */
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #2c3e50;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* 菜单列表重置样式 */
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 一级菜单项间距 */
.menu-item {
  margin: 10px 0;
}

/* 一级标题样式 */
.menu-title {
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.menu-title:hover {
  background-color: #34495e;
}

/* 箭头图标样式 */
.arrow-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
  font-style: normal; /* 取消i标签默认斜体 */
}

.arrow-icon.active {
  transform: rotate(90deg); /* 展开时旋转箭头 */
}

/* 子菜单列表样式 */
.submenu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #1a2530;
}

/* 子菜单项样式 */
.submenu-item {
  padding: 10px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submenu-item:hover {
  background-color: #2c3e50;
}

/* 当前路由高亮样式 */
.submenu-item.active {
  background-color: #1abc9c;
  color: #fff;
  font-weight: 600;
}
</style>