<template>
  <div class="education-live">
    <h1>🎥 教育广场 - 直播课堂</h1>
    <div class="live-room">
      <div class="live-item">
        <h3>【今晚 20:00】Vue 3 新特性实战</h3>
        <p>讲师：前端老杨 | 已预约 1200+ 人</p>
        <button class="join-btn">立即预约</button>
      </div>
      <div class="live-item">
        <h3>【明日 14:00】前端性能优化技巧</h3>
        <p>讲师：前端小雨 | 已预约 850+ 人</p>
        <button class="join-btn">立即预约</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可在这里添加直播列表、预约直播的逻辑
</script>

<style scoped>
.education-live {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.education-live h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #1abc9c;
  padding-bottom: 10px;
}

.live-room {
  margin-top: 20px;
}

.live-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.live-item h3 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.live-item p {
  color: #999;
  font-size: 14px;
}

.join-btn {
  padding: 8px 16px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.join-btn:hover {
  background-color: #16a085;
}
</style>