<template>
  <div class="writing-poem">
    <h1>📜 写作广场 - 诗歌创作</h1>
    <div class="poem-content">
      <pre>
《夜》
星光落进窗沿，
晚风轻叩门帘，
笔尖划过纸页，
心事藏进字间。
      </pre>
      <div class="poem-item">
        <pre>
《晨》
朝阳吻醒露水，
鸟鸣穿过林间，
新的一天启程，
步履奔赴向前。
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可添加加载诗歌、发布诗歌的逻辑
</script>

<style scoped>
.writing-poem {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.writing-poem h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #9b59b6;
  padding-bottom: 10px;
}

.poem-content {
  margin-top: 20px;
  color: #666;
  font-family: "宋体", SimSun, serif;
  line-height: 2;
}

.poem-item {
  margin-top: 20px;
  border-top: 1px dashed #eee;
  padding-top: 20px;
}

pre {
  white-space: pre-wrap; /* 保留换行和空格，同时自动换行 */
  font-size: 16px;
}
</style>