// src/utils/dateUtils.js

/**
 * 将 ISO 日期字符串格式化为 "YYYY-MM-DD HH:mm:ss"
 * @param {string} dateStr - 日期字符串，如 "2026-02-28T04:05:43.123Z"
 * @returns {string} 格式化后的日期
 */
export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  // 替换 T 为空格，并去除毫秒部分
  return dateStr.replace('T', ' ').split('.')[0]
}

/**
 * 只格式化日期部分 "YYYY-MM-DD"
 */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  return dateStr.split('T')[0]
}