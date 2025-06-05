# 音效文件设置说明

互动出框播放系统支持音效增强，您需要准备以下音效文件：

## 音效文件列表

### 1. 触摸音效
- **文件名**: `touch.mp3` / `touch.ogg`
- **路径**: `audio/touch.mp3`
- **描述**: 触摸屏幕时播放的音效
- **建议时长**: 0.1-0.3秒
- **推荐音效**: 轻柔的点击声或水滴声

### 2. 手势音效
- **文件名**: `gesture.mp3` / `gesture.ogg`
- **路径**: `audio/gesture.mp3`
- **描述**: 手势识别成功时播放的音效
- **建议时长**: 0.2-0.5秒
- **推荐音效**: 成功提示音或魔法音效

## 音效格式要求

### 支持的格式
- **MP3**: 广泛兼容，推荐使用
- **OGG**: 开源格式，更小文件大小
- **WAV**: 最高质量，但文件较大

### 质量参数
- **采样率**: 44.1kHz 或 48kHz
- **比特率**: 128kbps - 320kbps
- **声道**: 单声道或立体声

## 创建/获取音效

### 1. 自己录制
```bash
# 使用Audacity等音频编辑软件录制
# 确保音量适中，无杂音
# 导出为MP3和OGG两种格式
```

### 2. 免费音效资源
- **Freesound.org**: 大量免费音效
- **Zapsplat**: 注册后免费下载
- **Adobe Audition**: 内置音效库

### 3. 生成简单音效
```javascript
// 使用Web Audio API生成简单音效
function generateTouchSound() {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}
```

## 文件结构
```
audio/
├── touch.mp3      # 触摸音效 (MP3格式)
├── touch.ogg      # 触摸音效 (OGG格式)
├── gesture.mp3    # 手势音效 (MP3格式)
└── gesture.ogg    # 手势音效 (OGG格式)
```

## 使用示例音效

如果暂时没有音效文件，可以使用以下方法：

### 1. 禁用音效
在设置面板中取消勾选"启用音效"选项。

### 2. 使用静音文件
创建短暂的静音音频文件作为占位符：
```html
<!-- 静音音频文件 -->
<audio id="touch-sound" preload="auto">
    <source src="data:audio/mp3;base64,SUQzAwAAAAAA..." type="audio/mpeg">
</audio>
```

### 3. 简单音效代码
```javascript
// 简单的蜂鸣音效
function playBeep(frequency = 800, duration = 100) {
    if (window.AudioContext || window.webkitAudioContext) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
}
```

## 音效优化建议

### 1. 性能优化
- 使用较低的采样率（44.1kHz已足够）
- 压缩文件大小，但保持质量
- 预加载常用音效

### 2. 用户体验
- 音效应该简短且不刺耳
- 提供音量控制选项
- 允许用户完全禁用音效

### 3. 兼容性
- 提供多种格式（MP3 + OGG）
- 检测浏览器支持情况
- 优雅降级处理

## 许可证注意事项

使用音效文件时请注意：
- 确保有使用权限
- 遵守许可证要求
- 商业使用需要相应授权

---

*音效能够显著提升用户体验，但不是必需的。系统在没有音效文件时也能正常工作。* 