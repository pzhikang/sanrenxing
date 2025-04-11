<template>
  <div class="app">
    <button class="new-dialog-btn" @click="addNewDialog">新建对话</button>

    <div class="sidebar-btn history" @click="openHistory" @mouseenter="showTooltip('history')" @mouseleave="hideTooltip">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <div v-if="tooltipVisible && tooltipType === 'history'" class="tooltip">历史记录</div>
    </div>

    <div class="sidebar-btn cang" @click="openCang" @mouseenter="showTooltip('cang')" @mouseleave="hideTooltip">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="m20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82M7 7h.01"/>
      </svg>
      <div v-if="tooltipVisible && tooltipType === 'cang'" class="tooltip">收藏夹</div>
    </div>

    <div class="chat-container" :class="{ 'moved': isMoved, 'small-margin-left': isMarginLeftSmall }">
      <div class="chat-messages" ref="chatMessages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
          <!-- <img :src="message.avatar" :alt="message.type" class="avatar"> -->
          <div class="message-content">
            {{ message.text }}
            <!-- 仅在第一条服务器消息显示课程 -->
           
          </div>
          <span v-if="message.file" class="file-name">{{ message.file }}</span>
        </div>
      </div>

      <div class="chat-input">
        <div class="input-container">
          <input v-model="newMessage" @keyup.enter="sendMessage" class="input" placeholder="请输入内容...">
          <label for="file-upload" class="send-file-btn">
            <input id="file-upload" type="file" @change="handleFileUpload" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 256 256"><path fill="currentColor" d="m212.48 136.49l-82.06 82a60 60 0 0 1-84.85-84.88l98.16-97.89a40 40 0 0 1 56.56 56.59l-.17.16l-95.8 92.22a12 12 0 1 1-16.64-17.3l95.71-92.12a16 16 0 0 0-22.7-22.56l-98.16 97.86a36 36 0 0 0 50.93 50.91l82.06-82a12 12 0 0 1 17 17Z"></path></svg>
          </label>
          <button @click="sendMessage" class="send-btn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m0 176H48V48h160ZM90.34 125.66a8 8 0 0 1 0-11.32l32-32a8 8 0 0 1 11.32 0l32 32a8 8 0 0 1-11.32 11.32L136 107.31V168a8 8 0 0 1-16 0v-60.69l-18.34 18.35a8 8 0 0 1-11.32 0"></path></svg></button>
        </div>
      </div>
    </div>

    <div class="notes-container" v-if="isVisible">
      <h1>收藏夹</h1>
      <div v-for="(note, index) in notes" :key="index" class="note">
        <h3>
          {{ note.title }}
          <span class="delete-icon" @click="deleteNote(index)">×</span>
        </h3>
        <hr style="margin-top: -59px; margin-bottom: -5px; color: #cbcbcb;">
        <p>{{ note.content }}</p>
      </div>
      <div class="add-note-container" @click="addNote">返回</div>
    </div>

    <div class="history-container" v-if="isHistoryVisible">
      <h1>历史记录</h1>
      <div v-for="(history, index) in histories" :key="index" class="note">
        <h3>
          {{ history.title }}
          <span class="delete-icon" @click="deleteHistory(index)">×</span>
        </h3>
        <hr style="margin-top: -59px; margin-bottom: -5px; color: #cbcbcb;">
        <p>{{ history.content }}</p>
      </div>
      <div class="add-note-container" @click="closeHistory">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      notes: [
        { title: '简述高等数学这个科目', content: '通常认为，高等数学是由微积分学、较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科。主要内容包括：数列、极限、微积分、空间解析几何与线性代数等。' },
        { title: '简述C++这个科目', content: '生成程序是指将源码（C++语句）转换成一个可以运行的应用程序的过程。如果程序编写正确，'},
        { title: '再次简述C++这个科目', content: 'dhusiajfhiadhfcuidk' }
      ],
      histories: [
        { title: '历史记录1', content: '这是第一个历史记录的内容。' },
        { title: '历史记录2', content: '这是第二个历史记录的内容。' },
        { title: '历史记录3', content: '这是第三个历史记录的内容。' }
      ],
      isVisible: false,
      isHistoryVisible: false,
      messages: [
        { text: '你好!我是由长春理工大学人工智能学院杨洋老师团队研发的个性化智能助教系统。我可以24小时在线解答同学们任何课程相关的问题。如果您有任何课程相关的问题，欢迎随时向我提问。', type: 'server', avatar: 'https://via.placeholder.com/40' },
      ],
      newMessage: '',
      uploadedFile: null,
      currentSearchQuery: '',
      tooltipVisible: false,
      tooltipType: '',
      isMoved: false,
      isMarginLeftSmall: false,
      isDialogSettingVisible: false,
      selectedDialogs: {
        new: [],
        recent: []
      },
      dialogSettings: {
        new: [],
        recent: []
      },
      currentCourse: ''
    }
  },
  mounted() {
    // 优先从路由参数获取课程，其次从本地缓存，最后默认值
    this.currentCourse =
      this.$route.query.course ||
      localStorage.getItem('selectedCourse') ||
      '未选择课程';
  },
  methods: {
    addNewDialog() {
      // 实现新建对话逻辑
    },
    openHistory() {
      this.isHistoryVisible = !this.isHistoryVisible;
    },
    closeHistory() {
      this.isHistoryVisible = !this.isHistoryVisible;
    },
    deleteHistory(index) {
      this.histories.splice(index, 1);
    },
    openCang() {
      this.isVisible = !this.isVisible;
      this.isDialogSettingVisible = !this.isDialogSettingVisible;
    },
    addNote() {
      this.isVisible = !this.isVisible;
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    async sendQuestion1(question) {
    try {
      const formData = new FormData();
      formData.append('question', question);
      formData.append('model_name', 'deepseek');

      const response = await fetch('http://api.xdrv.cn:52381/zhihuijiaoyu/get_teacher_text_files/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'YourAppName/1.0 (YourDeviceInfo)'
        },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) throw new Error('请求失败');
      const data = await response.json();
      return data.answer || '默认值';
    } catch (error) {
      console.error('API 错误:', error);
      return error.message || '请求失败';
    }
  },
    async sendMessage() {
  if (this.newMessage.trim() === '' && !this.uploadedFile) return;

  // 用户消息
  const userMessage = {
    text: this.newMessage,
    type: 'user',
    avatar: 'https://via.placeholder.com/40'
  };
  if (this.uploadedFile) {
    userMessage.file = this.uploadedFile.name;
    this.uploadedFile = null;
  }
  this.messages.push(userMessage);
  this.newMessage = '';

  // 调用 API 获取回复
  try {
    const answer = await this.sendQuestion1(userMessage.text);
    this.messages.push({
      text: answer,
      type: 'server',
      avatar: 'https://via.placeholder.com/40'
    });
  } catch (error) {
    this.messages.push({
      text: '获取回复失败: ' + error.message,
      type: 'server',
      avatar: 'https://via.placeholder.com/40'
    });
  }

  // 滚动到底部
  this.$nextTick(() => {
    const chatMessages = this.$refs.chatMessages;
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  });
},

    handleSettingClick(category, index) {
      console.log(`Setting clicked for ${category} dialog at index ${index}`);
      this.$set(this.dialogSettings[category], index, !this.dialogSettings[category][index]);
      this.isDialogSettingVisible = !this.isDialogSettingVisible;
    },
    toggleSelectDialog(category, index) {
      const selectedIndex = this.selectedDialogs[category].indexOf(index);
      if (selectedIndex > -1) {
        this.selectedDialogs[category].splice(selectedIndex, 1);
      } else {
        this.selectedDialogs[category].push(index);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFile = file;
      }
    },
    showTooltip(type) {
      this.tooltipVisible = true;
      this.tooltipType = type;
    },
    hideTooltip() {
      this.tooltipVisible = false;
      this.tooltipType = '';
    }
  }
}
</script>

<style scoped>
.app {
  background-color: #fafcfd;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.new-dialog-btn {
  background-color: #E6EDF8;
  color: #3366FF;
  border: 1px solid #3366FF;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  width: 100px;
  height: 30px;
  position: fixed;
  bottom: 110px;
  left: 850px;
  transform: translateX(-50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 20px;
  z-index: 100;
}
.new-dialog-btn:hover {
  background-color: #D9E5F3;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 96vh;
  background-color: #fafcfd;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  margin-left: 226px;
  width: 1327px;
  transition: margin-left 0.3s ease;
  transition: width 0.1s ease;
  position: relative;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #fafcfd;
  position: relative;
  top: 30px;
}

.message {
  margin: 5px 201px;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
  display: flex;
  align-items: flex-start;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
  margin-right: 0;
  position: relative;
}

.message.server {
  align-self: flex-start;
  flex-direction: row;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message.user .avatar {
  margin-left: 10px;
  margin-right: 0px;
}

.message-content {
  background-color: #d1f5d3;
  border-radius: 12px;
  color: rgba(60, 131, 212, 0.943);
  font: var(--s-font-base);
  padding: 9px 16px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 0px;
  max-width: 450px;
  white-space: normal;
  word-wrap: break-word;
  margin-bottom: 10px;
  position: relative;
  text-align: left;
}

.message.user .message-content {
  background-color: #36f;
  color: #fff;
  align-self: flex-end;
}

.message.server .message-content {
  background-color: #ffffff;
  align-self: flex-start;
}

.chat-input {
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #fafcfd;
}

.input-container {
  position: relative;
  width: 650px;
  height: 66px;
  box-shadow: 0 8px 18px rgba(12, 12, 12, 0.1);
  border-radius: 35px;
  overflow: hidden;
  display: flex;
  left: -100px;

}

.input {
  width: 92%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 54px;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 16px;
  color: #333;
}

.send-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49px;
  height: 34px;
  border-radius: 42%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.send-file-btn {
  position: absolute;
  top: 30%;
  left: 86%;
}

.cang {
  position: fixed;
  top: auto;
  bottom: 20px;
  right: 40px;
  width: 45px;
  height: 45px;
  background-color: #f0f0f0;
  border-radius: 50%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
}
.cang:hover{
  background-color: #ffffff;
}
.sidebar-btn.cang {
  flex-direction: row;
  align-items: center;
}

.sidebar-btn.cang svg {
  margin-right: 0;
  transform: rotate(90deg);
}
.sidebar-btn.cang .icon {
  width: 20px;
  height: 20px;
  fill: #999;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.dialog-text {
  text-align: left;
  flex-grow: 1;
}

.setting-btn {
  background-color: transparent;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s, color 0.3s;
  position: absolute;
  left: 80%;
}

.file-name {
  margin-top: 5px;
  color: #555;
  position: absolute;
  left: 63%;
  top: -19%;
}

.notes-container {
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  position: fixed;
  height: 940px;
  background-color: #fafcfd;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  padding-top: 80px;
  left: 12%;
  top: 0%;
  width: 1500px;
  z-index: 100;
}
.notes-container h1 {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.history-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  position: fixed;
  height: 940px;
  background-color: #fafcfd;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  padding-top: 80px;
  left: 12%;
  top: 0%;
  width: 1500px;
  z-index: 100;
}
.history-container h1 {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.note {
  background-color: #f5f5f5;
  width: 320px;
  margin-top: 5px;
  padding: 1px;
  margin-left: 90px;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  cursor: pointer;
}

.note h3 {
  margin-left: 10px;
  color: rgba(0, 0, 0, 1);
}

.note p {
  font-family: 'NSimSun', serif;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.65);
}

.delete-icon {
  font-size: 35px;
  cursor: pointer;
  color: #000;
  margin-left: 280px;
  top: -38px;
  position: relative;
  font-weight: 1;
}
.history {
  position: fixed;
  top: auto;
  bottom: 80px;
  right: 40px;
  width: 45px;
  height: 45px;
  background-color: #f0f0f0;
  border-radius: 50%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
}
.history:hover {
  background-color: #ffffff;
}
.history svg {
  margin-right: 0;
}
.history .icon {
  width: 20px;
  height: 20px;
  fill: #999;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.tooltip {
  position: absolute;
  right: 50px;
  background-color: #3366FF;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 101;
}

.history .tooltip {
  bottom: 10px;
}

.cang .tooltip {
  bottom: 10px;
}

.add-note-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #3366FF;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  z-index: 100;
}

.history-container .add-note-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  z-index: 100;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  z-index: 100;
}

.current-course {
  margin-top: 10px;
  color: #999999;
  font-size: 1em;
  position: absolute;
  left: 250px;
  bottom: 10px;
  width: 300px;
}
</style>
