<template>
  <div class="modal-contentwzjx">
     <div class="wzjxzw">文章解析</div>
     <div class="chat-messageswzjx" ref="chatMessages1">
       <!-- 遍历消息数组，渲染每条消息 -->
       <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
         <!-- 头像 -->
         <!--<img :src="message.avatar" :alt="message.type" class="avatar" />-->
         <img data-v-1ef3ed61="" src="/static/img/logo.121ca8fb.jpg" alt="server" class="avatar">
         <!-- 消息内容 -->
         <div class="message-content">
           {{ message.text }}
         </div>
         <!-- 文件信息 -->
         <div v-if="message.fileName" class="file-info">{{ message.fileName }}</div>
       </div>
     </div>
     <!-- 发送文件按钮 -->
     <div class="wzjxfswj">
       <label for="file-upload" class="send-file-btnwzjx">
         <input 
           id="file-upload" 
           type="file" 
           accept="application/pdf"
           @change="handleFileUpload" 
           style="display: none;" 
         />
         <svg class="wzjxsvg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="M9 22c-9 1-8-10 0-9C6 2 23 2 22 10c10-3 10 13 1 12m-12-4l5-4l5 4m-5-4v15"></path></svg>
         {{ selectedFileName ? selectedFileName : '点击或拖拽文件上传' }}
       </label>
     </div>
     <!-- 输入框容器 -->
     <div class="chat-inputwzjx">
       <div class="input-containerwzjx">
         <!-- 输入框 -->
         <input 
           v-model="newMessage" 
           @keyup.enter="sendMessage" 
           class="input" 
           placeholder="这里是文章解析，请上传文件并提出您的要求..." 
         />
         <!-- 发送按钮 -->
         <button @click="sendMessage" class="send-btn">
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m0 176H48V48h160ZM90.34 125.66a8 8 0 0 1 0-11.32l32-32a8 8 0 0 1 11.32 0l32 32a8 8 0 0 1-11.32 11.32L136 107.31V168a8 8 0 0 1-16 0v-60.69l-18.34 18.35a8 8 0 0 1-11.32 0"></path></svg>
         </button>
       </div>
     </div>
     <!-- 新增的获取文章解析记录按钮 -->
     <button @click="showArticleParsingRecordDetails" class="fetch-record-btn">
       获取文章解析记录
     </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Chat',
  data() {
    return {
      messages: [], // 消息数组
      newMessage: '', // 输入框绑定的数据
      selectedFile: null, // 存储上传的文件对象
      selectedFileName: '', // 存储文件名
      user_name: 'S0528', // 用户名
      recordDetails: null, // 存储记录详情
      recordError: null // 存储错误信息
    };
  },
  methods: {
    async sendMessage() {
      const student_id = localStorage.getItem('student_id');
      if (this.newMessage.trim() === '' &&!this.selectedFile) return;
      
      // 添加用户消息到消息数组
      const myDate = new Date()
      this.messages.push({ 
        text: this.newMessage, 
        type: 'user', 
        avatar: 'https://via.placeholder.com/40',
        fileName: this.selectedFileName,
        time: myDate.toLocaleString()
      });
      
      // 添加等待回复消息
      this.messages.push({ 
        text: '等待回答...', 
        type: 'server', 
        avatar: 'https://via.placeholder.com/40'
      });
      
      // 滚动到底部
      this.scrollToBottom()
      
      // 准备发送数据
      const formData = new FormData()
      formData.append('abstract', this.newMessage)
      formData.append('student_id', student_id)
      if (this.selectedFile) {
        formData.append('file', this.selectedFile)
      }
      console.log('Second Request FormData:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      
      try {
        const response = await axios.post(
          'http://api.xdrv.cn:52381/zhihuijiaoyu/get_abstract/', 
          formData
        )
        
        // 更新最后一条服务器消息
        if (this.messages.length > 0) {
          const lastIndex = this.messages.length - 1
          if (this.messages[lastIndex].text === '等待回答...') {
            this.messages[lastIndex].text = response.data.answer;
            // 确保在DOM更新后调用scrollToBottom
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          }
        }
      } catch (error) {
        console.error('发送消息时出现错误:', error);
        if (error.response) {
          console.log('错误响应状态码:', error.response.status);
          console.log('错误响应头:', error.response.headers);
          console.log('错误响应数据:', error.response.data);
        } else if (error.request) {
          console.log('请求已发出，但未收到响应:', error.request);
        } else {
          console.log('设置请求时出现错误:', error.message);
        }
        if (this.messages.length > 0) {
          const lastIndex = this.messages.length - 1
          if (this.messages[lastIndex].text === '等待回答...') {
            this.messages[lastIndex].text = '获取答案失败，请重试。'
          }
        }
      }
      
      // 清空输入和文件选择
      this.newMessage = '';
      this.selectedFile = null;
      this.selectedFileName = '';
      
      // 手动触发视图更新
      this.$forceUpdate();
      
      // 清空文件输入框的值
      this.$nextTick(() => {
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
          fileInput.value = '';
          // 触发 change 事件，确保视图更新
          const event = new Event('change');
          fileInput.dispatchEvent(event);
        }
      });
    },
    
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.selectedFileName = file.name
        // 手动清空文件输入框的值，避免浏览器缓存问题
        event.target.value = null;
      }
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const div = this.$refs.chatMessages1;
        if (div) {
          div.scrollTop = div.scrollHeight;
        }
      });
    },
    
    async fetchArticleParsingRecord() {
      const student_id = localStorage.getItem('student_id');
      let url = 'http://182.92.238.241:52381/zhihuijiaoyu/get_article_parsing_record/';
      if (student_id) {
        url += `?id=${student_id}`;
      }
      try {
        const response = await axios.get(url);
        console.log('获取文章解析记录成功，返回数据:', response.data);
        return response.data;
      } catch (error) {
        console.error('获取文章解析记录时出现错误:', error);
        if (error.response) {
          console.log('错误响应状态码:', error.response.status);
          console.log('错误响应头:', error.response.headers);
          console.log('错误响应数据:', error.response.data);
        } else if (error.request) {
          console.log('请求已发出，但未收到响应:', error.request);
        } else {
          console.log('设置请求时出现错误:', error.message);
        }
        return null;
      }
    },
    
    async showArticleParsingRecordDetails() {
      const record = await this.fetchArticleParsingRecord();
      if (record) {
        if (record.error) {
          this.recordError = record.error;
          console.error('获取的记录存在错误:', record.error);
          alert(`错误: ${record.error}`);
        } else {
          this.recordDetails = record;
          const details = `ID: ${record.id}\n摘要: ${record.abstract}\n文章路径: ${record.article_path}\n结果: ${record.result}\n创建时间: ${record.created_at}`;
          console.log('获取文章解析记录详情:', details);
          alert(details);
        }
      } else {
        console.error('获取文章解析记录失败，未获取到有效记录');
      }
    }
  },
  mounted() {
    this.fetchArticleParsingRecord();
  }
};
</script>

<style scoped>
/* 保持原有的样式不变 */
.modal-contentwzjx {
  width: 87%;
  height: 100%;
}
.small-margin-left1 {
  width: 1568px;
  height: 961px;
  position: absolute;
  left: 111px;
  top: -1%;
  z-index: 100;
  background-color: #FAFCFD;
}
.chat-inputwzjx {
  display: flex;
  justify-content: center;
  padding: 10px;
  position: absolute;
  left: 27%;
  top: 89%;
}
.input-containerwzjx {
  position: relative;
  width: 700px;
  height: 66px;
  box-shadow: 0 8px 18px rgba(12, 12, 12, 0.1);
  border-radius: 35px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 54px;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 16px;
  color: #333;
}
.wzjxfswj {
  min-width: 191px;
  min-height: 42px;
  max-width: 200px;
  max-height: 100px;
  position: absolute;
  bottom: 120px;
  left: 42%;
  color: #999;
  z-index: 102;
  background-color: #D9D9D9;
  border-radius: 13px 13px 13px 13px;
}
.wzjxsvg {
  position: relative;
  top: 8px;
  left: 3px;
}
.close-btnwzjx {
  position: absolute;
  left: 77px;
  top: 61px;
  font: 19px;
}
.chat-messageswzjx[data-v-29156b25] {
    width: 1182px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 37px;
    overflow-y: auto;
    position: absolute;
    left: 114px;
    top: 122px;
    height: calc(78% - 122px - 10px);
}
.wzjxzw {
  width: 84px;
  height: 30px;
  color: #000000;
  font-size: 20px;
  position: absolute;
  top: 5%;
  left: 45%;
}
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #fafcfd;
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
  border-radius: var(--s-radius-s, 12px);
  color: rgba(60, 131, 212, 0.943);
  color: var(--s-color-text-secondary, rgba(0, 0, 0, .85));
  font: var(--s-font-base);
  padding: 9px 16px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 0px;
  max-width: 450px;
  --base-send-message-box-color: var(--s-color-bg-trans, rgba(0, 0, 0, .04));
  white-space: normal;
  word-wrap: break-word;
  margin-bottom: 10px;
  position: relative;
  align-self: flex-end;
  text-align: right;
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
  left: 87%;
}
.file-info {
  margin-top: 5px;
  color: #555;
  position: absolute;
  left: 63%;
  top: -19%;
}
/* 新增按钮的样式 */
.fetch-record-btn {
  position: relative;
  bottom: -680px;
  left: 300px;
  transform: translateX(-50%);
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.fetch-record-btn:hover {
  background-color: #0056b3;
}
</style>