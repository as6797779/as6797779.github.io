<template>
  <div class="writing-home">
    <h1>✍️ 写作广场 - 首页</h1>
    <div class="content">
      <p>以笔为媒，记录思想，分享创作的乐趣！</p>
      <div class="tab">
        <span>热门分类：</span>
        <!-- 替换原生 a 标签为 router-link 组件，实现路由跳转 -->
        <router-link to="/writing/essay" class="tab-link">散文</router-link>
        <router-link to="/writing/poem" class="tab-link">诗歌</router-link>
        <router-link to="/writing/novel" class="tab-link">小说</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可添加加载热门作品的逻辑
</script>

<style scoped>
.writing-home {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.writing-home h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #9b59b6;
  padding-bottom: 10px;
}

.content {
  color: #666;
  font-size: 16px;
  line-height: 1.8;
}

.tab {
  margin-top: 15px;
}

.tab span {
  color: #333;
  font-weight: bold;
}

.tab a {
  margin: 0 10px;
  color: #9b59b6;
  text-decoration: none;
}

.tab a:hover {
  text-decoration: underline;
}
</style>