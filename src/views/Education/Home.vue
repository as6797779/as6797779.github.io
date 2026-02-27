<template>
  <div class="education-home">
    <h1>📚 教育广场 - 首页</h1>
    <div class="content">
      <p>欢迎来到教育广场，这里是学习交流、资源共享的核心区域！</p>
      <ul class="feature-list">
        <li>海量精品课程，覆盖全学科</li>
        <li>实时直播课堂，与讲师互动学习</li>
        <li>学习资料下载，提升学习效率</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 可在这里添加首页的业务逻辑（比如加载推荐课程）
</script>

<style scoped>
.education-home {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.education-home h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #1abc9c;
  padding-bottom: 10px;
}

.content {
  color: #666;
  font-size: 16px;
  line-height: 1.8;
}

.feature-list {
  margin-top: 15px;
  padding-left: 20px;
}

.feature-list li {
  margin: 8px 0;
}
</style>