<template>
  <div class="writing-novel">
    <!-- 页面标题 -->
    <h1>📖 写作广场 - 小说创作</h1>
    
    <!-- 右上角新增小说按钮 -->
    <button class="add-novel-btn" @click="showAddNovelDialog = true">
      + 新增小说
    </button>

    <!-- 小说列表区域 -->
    <div class="novel-list-section">
      <h2>我的小说列表</h2>
      <div class="novel-list">
        <!-- 小说列表项（从后端获取） -->
        <div 
          class="novel-item" 
          v-for="(novel, index) in novelList" 
          :key="index"
          :class="{ active: activeNovelId === novel.id }"
          @click="selectNovel(novel.id)"
        >
          <!-- 封面图，可根据后端返回是 byte[] 或 base64 字符串调整显示方式 -->
          <img
            v-if="novel.coverPage"
            class="novel-cover"
            :src="getCoverUrl(novel.coverPage)"
            alt="封面"
          />
          <h3>{{ novel.name }}</h3>
          <p class="novel-desc">{{ novel.introduction }}</p>
          <p class="novel-meta">
            更新时间：{{ formatDateTime(novel.updateDate) }}
          </p>
          <!-- 操作按钮组 -->
          <div class="novel-actions">
            <button @click.stop="openChapterCatalog(novel.id)">章节目录</button>
            <button @click.stop="generateNewNovel()">生成新小说</button>
            <button @click.stop="deleteNewChapter()" class="danger-btn">删除新章节</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 章节目录 & 内容区域（选中小说后显示） -->
    <div class="chapter-section" v-if="activeNovelId">
      <h2>{{ activeNovel?.title }} - 章节目录</h2>
      
      <!-- 章节列表 -->
      <div class="chapter-list">
        <div 
          class="chapter-item" 
          v-for="(chapter, index) in chapterList" 
          :key="index"
          :class="{ active: activeChapterIndex === index }"
          @click="openChapterContent(index)"
        >
          {{ chapter.title }}
        </div>
      </div>

      <!-- 章节内容区域 -->
      <div class="chapter-content" v-if="activeChapterIndex !== -1">
        <h3>{{ chapterList[activeChapterIndex]?.title }}</h3>
        <div class="content-text">
          {{ chapterList[activeChapterIndex]?.content }}
        </div>
        <!-- 上下翻页按钮 -->
        <div class="page-nav">
          <button 
            @click="prevChapter()"
            :disabled="activeChapterIndex <= 0"
          >
            上一章
          </button>
          <button 
            @click="nextChapter()"
            :disabled="activeChapterIndex >= chapterList.length - 1"
          >
            下一章
          </button>
        </div>
      </div>
    </div>

    <!-- 新增小说弹窗 -->
    <div class="dialog-overlay" v-if="showAddNovelDialog" @click.self="showAddNovelDialog = false">
      <div class="dialog-content">
        <h3>📝 创建新小说</h3>
        <div class="form-group">
          <label for="novel-title">小说标题</label>
          <input 
            id="novel-title"
            v-model="newNovelForm.title" 
            type="text" 
            placeholder="请输入小说标题"
            maxlength="50"
          />
          <div class="char-count">{{ newNovelForm.title.length }}/50</div>
        </div>
        <div class="form-group">
          <label for="novel-outline">小说大纲</label>
          <textarea 
            id="novel-outline"
            v-model="newNovelForm.outline" 
            placeholder="请输入小说大纲（支持大文本量，建议 500-2000 字）"
            rows="10"
          ></textarea>
          <div class="char-count">{{ newNovelForm.outline.length }} 字</div>
        </div>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="showAddNovelDialog = false">取消</button>
          <button class="submit-btn" @click="submitNewNovel">提交创建</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus' // 可选：需安装 element-plus，也可替换为 alert
import request from '@/utils/request' // 封装的 axios 实例，用于请求后端
import { formatDateTime } from '@/utils/dateUtils' // 日期格式化工具函数

// 1. 后端小说列表数据，初始化为空
const novelList = reactive([])

// helper: 将后端 byte[] 或 base64 转为可用于 img 的 URL
const getCoverUrl = (cover) => {
  if (!cover) return ''
  // 假设后端直接返回 base64 字符串
  if (typeof cover === 'string') {
    return cover.startsWith('data:') ? cover : `data:image/jpeg;base64,${cover}`
  }
  // 如果是数组缓冲区，转换
  try {
    const blob = new Blob([new Uint8Array(cover)], { type: 'image/jpeg' })
    return URL.createObjectURL(blob)
  } catch (e) {
    return ''
  }
}

// 从后端获取小说列表
const loadNovels = async () => {
  try {
    // 如果 baseURL 没有配置，可以直接使用绝对地址
    const res = await request.get('http://127.0.0.1:9991/getNovels')
    // 假设返回的是数组形式
    novelList.length = 0
    if (Array.isArray(res)) {
      res.forEach(item => novelList.push(item))
    } else if (res.data && Array.isArray(res.data)) {
      res.data.forEach(item => novelList.push(item))
    }
  } catch (err) {
    console.error('获取小说列表失败：', err)
  }
}

// 组件挂载时加载小说列表
onMounted(() => {
  loadNovels()
})

// expose utility to template


// 2. 响应式变量：当前选中的小说 ID、章节索引、章节列表
const activeNovelId = ref(null) // 当前选中的小说 ID
const activeNovel = ref({}) // 当前选中的小说详情 (也会使用新属性 name/introduction 等)
const activeChapterIndex = ref(-1) // 当前选中的章节索引（-1 表示未选中）
const chapterList = reactive([]) // 当前小说的章节列表

// 新增小说弹窗相关变量
const showAddNovelDialog = ref(false) // 弹窗显示状态
const newNovelForm = reactive({
  title: '',
  outline: ''
})

// 3. 选中小说（点击小说列表项）
const selectNovel = (novelId) => {
  activeNovelId.value = novelId
  // 模拟根据小说 ID 请求后端获取小说详情
  activeNovel.value = novelList.find(item => item.id === novelId) || {}
  // 重置章节选中状态
  activeChapterIndex.value = -1
}

// 4. 打开章节目录（模拟请求后端接口）
const openChapterCatalog = (novelId) => {
  // 模拟向后端发起请求：GET /api/novel/${novelId}/chapters
  console.log(`[临时API] 请求小说${novelId}的章节目录：/api/novel/${novelId}/chapters`)
  
  // 模拟后端返回的章节数据
  const mockChapterData = [
    { title: '第1章：启程', content: '清晨的阳光穿过舷窗，洒在少年的脸上，他握紧手中的星际通行证，踏上了前往阿尔法星系的旅途。这是他第一次离开母星，心中既有忐忑，也有对未知的期待。' },
    { title: '第2章：相遇', content: '在星际驿站，他遇到了一位神秘的女领航员，她的飞船编号刻着「星河号」，据说曾穿越过黑洞边缘。两人的相遇，改变了少年原本的行程。' },
    { title: '第3章：危机', content: '飞船进入小行星带，突然遭遇陨石雨袭击，引擎受损，通讯中断。少年和领航员必须在12小时内修复引擎，否则将永远困在小行星带。' },
    { title: '第4章：转机', content: '少年想起了父亲教他的应急维修技巧，在领航员的配合下，终于找到了引擎故障的核心问题。就在修复完成的瞬间，他们收到了母星的救援信号。' }
  ]
  
  // 将模拟数据赋值给章节列表
  chapterList.length = 0 // 清空原有数据
  mockChapterData.forEach(item => chapterList.push(item))
  
  // 提示用户
  ElMessage?.({
    type: 'success',
    message: `已加载《${activeNovel.value.title}》的章节目录（共${chapterList.length}章）`
  }) || alert(`已加载《${activeNovel.value.title}》的章节目录（共${chapterList.length}章）`)
}

// 5. 打开章节内容（点击章节列表项）
const openChapterContent = (index) => {
  activeChapterIndex.value = index
}

// 6. 上一章
const prevChapter = () => {
  if (activeChapterIndex.value > 0) {
    activeChapterIndex.value -= 1
  }
}

// 7. 下一章
const nextChapter = () => {
  if (activeChapterIndex.value < chapterList.length - 1) {
    activeChapterIndex.value += 1
  }
}

// 8. 生成新小说章节（模拟请求后端）
const generateNewNovel = () => {
  // 模拟向后端发起请求：POST /api/novel/generateChapter
  console.log('[临时API] 生成新小说：POST /api/novel/generateChapter')
  
  // 模拟生成结果
  ElMessage?.({
    type: 'info',
    message: `已生成小说章节：${newNovelTitle}（后端开发中，暂未入库）`
  }) || alert(`已生成小说章节：${newNovelTitle}（后端开发中，暂未入库）`)
}

// 9. 删除新章节（模拟请求后端）
const deleteNewChapter = () => {
  if (activeChapterIndex.value === -1) {
    ElMessage?.({
      type: 'warning',
      message: '请先选中要删除的章节'
    }) || alert('请先选中要删除的章节')
    return
  }
  
  // 模拟向后端发起请求：DELETE /api/novel/${activeNovelId}/chapter/${activeChapterIndex}
  console.log(`[临时API] 删除章节：DELETE /api/novel/${activeNovelId}/chapter/${activeChapterIndex.value}`)
  
  // 模拟删除操作
  chapterList.splice(activeChapterIndex.value, 1)
  activeChapterIndex.value = -1 // 重置章节选中状态
  
  ElMessage?.({
    type: 'success',
    message: '已删除选中的新章节（模拟操作）'
  }) || alert('已删除选中的新章节（模拟操作）')
}

// 10. 提交新小说
const submitNewNovel = () => {
  // 表单验证
  if (!newNovelForm.title.trim()) {
    ElMessage?.({ type: 'warning', message: '请输入小说标题' }) || alert('请输入小说标题')
    return
  }
  if (!newNovelForm.outline.trim()) {
    ElMessage?.({ type: 'warning', message: '请输入小说大纲' }) || alert('请输入小说大纲')
    return
  }
  if (newNovelForm.outline.length < 50) {
    ElMessage?.({ type: 'warning', message: '小说大纲至少需要 50 字' }) || alert('小说大纲至少需要 50 字')
    return
  }

  // 模拟向后端发起请求：POST /api/novel/create
  console.log('[临时API] 创建新小说：POST /api/novel/create', {
    title: newNovelForm.title,
    outline: newNovelForm.outline
  })

  // 模拟提交成功
  ElMessage?.({
    type: 'success',
    message: `《${newNovelForm.title}》创建成功，正在生成中...`
  }) || alert(`《${newNovelForm.title}》创建成功，正在生成中...`)

  // 重置表单并关闭弹窗
  newNovelForm.title = ''
  newNovelForm.outline = ''
  showAddNovelDialog.value = false
}
</script>

<style scoped>
.writing-novel {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: relative; /* 为绝对定位按钮提供参考 */
}

.writing-novel h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #9b59b6;
  padding-bottom: 10px;
}

/* 右上角新增按钮 */
.add-novel-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
}

.add-novel-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
}

.add-novel-btn:active {
  transform: translateY(0);
}

/* 小说列表区域 */
.novel-list-section {
  margin-bottom: 40px;
}

.novel-list-section h2 {
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
  border-left: 4px solid #9b59b6;
  padding-left: 10px;
}

.novel-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.novel-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.novel-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.novel-item.active {
  border-color: #9b59b6;
  background-color: #fdf2f8;
}

.novel-item h3 {
  color: #9b59b6;
  margin-bottom: 8px;
  font-size: 16px;
}

/* 简介省略号：最多显示两行，超出显示... */
.novel-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.novel-meta {
  color: #999;
  font-size: 12px;
  margin-bottom: 10px;
}

/* 封面图：固定宽高比 2:3（对应 600×900），图片裁剪填充 */
.novel-cover {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

/* 小说操作按钮组 */
.novel-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.novel-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease;
}

.novel-actions button:not(.danger-btn) {
  background-color: #9b59b6;
  color: #fff;
}

.novel-actions button:not(.danger-btn):hover {
  background-color: #8e44ad;
}

.danger-btn {
  background-color: #e74c3c !important;
  color: #fff !important;
}

.danger-btn:hover {
  background-color: #c0392b !important;
}

/* 章节区域 */
.chapter-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #eee;
}

.chapter-section h2 {
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
}

/* 章节列表 */
.chapter-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  max-height: 120px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.chapter-item {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.chapter-item:hover {
  background-color: #eee;
}

.chapter-item.active {
  background-color: #9b59b6;
  color: #fff;
}

/* 章节内容 */
.chapter-content {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.chapter-content h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 16px;
}

.content-text {
  color: #333;
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 20px;
  text-indent: 2em;
}

/* 翻页按钮 */
.page-nav {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.page-nav button {
  padding: 8px 20px;
  border: 1px solid #9b59b6;
  background-color: #fff;
  color: #9b59b6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-nav button:hover:not(:disabled) {
  background-color: #9b59b6;
  color: #fff;
}

.page-nav button:disabled {
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
}

/* 弹窗遮罩层 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 弹窗内容 */
.dialog-content {
  background-color: #fff;
  padding: 35px;
  border-radius: 16px;
  width: 550px;
  max-width: 90%;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.dialog-content h3 {
  color: #2c3e50;
  margin-bottom: 25px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

/* 表单组 */
.form-group {
  margin-bottom: 22px;
  position: relative;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #9b59b6;
  box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 180px;
  line-height: 1.6;
}

/* 字数统计 */
.char-count {
  position: absolute;
  right: 12px;
  bottom: 8px;
  color: #999;
  font-size: 12px;
}

/* 弹窗操作按钮 */
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.dialog-actions button {
  padding: 11px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background-color: #e5e5e5;
}

.submit-btn {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: #fff;
  box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}
</style>
