<template>
  <div class="education-course">
    <h1>🎓 教育广场 - 课程中心</h1>
    <div class="course-list">
      <div class="course-item">
        <h3>Vue 从入门到精通</h3>
        <p>适合前端新手，掌握 Vue 核心语法和实战技巧</p>
      </div>
      <div class="course-item">
        <h3>JavaScript 高级进阶</h3>
        <p>深入理解原型链、闭包、异步编程等核心概念</p>
      </div>
      <div class="course-item">
        <h3>前端工程化实战</h3>
        <p>学习 Vite、Webpack、ESLint 等工具的使用</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可在这里添加加载课程列表的逻辑
</script>

<style scoped>
.education-course {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.education-course h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #1abc9c;
  padding-bottom: 10px;
}

.course-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  transition: box-shadow 0.3s;
}

.course-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.course-item h3 {
  color: #1abc9c;
  margin-bottom: 8px;
}

.course-item p {
  color: #666;
  font-size: 14px;
}
</style>