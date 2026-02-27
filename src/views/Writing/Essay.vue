<template>
  <div class="writing-essay">
    <h1>📝 写作广场 - 散文创作</h1>
    <div class="essay-list">
      <div class="essay-item">
        <h3>春日出游记</h3>
        <p>三月的风，拂过枝头，带着花香，也带着希望...</p>
        <span class="author">作者：清风</span>
      </div>
      <div class="essay-item">
        <h3>深夜的书桌</h3>
        <p>台灯下的文字，是写给自己的温柔，也是对抗孤独的铠甲...</p>
        <span class="author">作者：墨影</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可添加加载散文列表、发布散文的逻辑
</script>

<style scoped>
.writing-essay {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.writing-essay h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #9b59b6;
  padding-bottom: 10px;
}

.essay-list {
  margin-top: 20px;
}

.essay-item {
  padding: 15px;
  border-bottom: 1px dashed #eee;
  margin-bottom: 15px;
}

.essay-item h3 {
  color: #9b59b6;
  margin-bottom: 8px;
}

.essay-item p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.author {
  color: #999;
  font-size: 14px;
}
</style>