<template>
  <div class="main-container">
    <el-card class="box-card">
      <template #header>
        <el-select v-model="selectedCourse" placeholder="请选择课程">
          <el-option label="图像处理" value="图像处理" />
          <el-option label="操作系统原理" value="操作系统原理" />
          <el-option label="数据结构与算法" value="数据结构与算法" />
          <el-option label="计算机网络" value="计算机网络" />
          <el-option label="软件工程" value="软件工程" />
        </el-select>
      </template>
      <div id="dialog_container">
        <div v-for="oneDialog in text_dialog" :key="oneDialog.time" class="dialog-item">
          <div class="question-card">
            <div class="user-info-right">{{ user_name }} --{{ oneDialog.time }}</div>
            <div class="question-content">{{ oneDialog.question }}</div>
          </div>
          <div class="answer-card">
            <div class="user-info-left">回答</div>
            <div class="answer-content" v-html="oneDialog.answer" />
          </div>
        </div>
      </div>
      <el-divider content-position="right" />
      <div class="input-container">
        <el-input
          v-model="txt_question"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="我是你的课程助教，尽管提问吧"
           @keydown.enter.native="ask_question"

        />
        <el-button class="ask-button" @click="ask_question">提问</el-button>
      </div>
    </el-card>

    <el-drawer
      :visible.sync="drawerVisible"
      direction="rtl"
      size="200px"
      class="drawer-right"
    >
      <div class="drawer-content">
        <el-button class="drawer-button" @click="createNewChat">创建新聊天</el-button>
        <el-button class="drawer-button" @click="showRecordOne">如何实现直方图均衡化？</el-button>
      </div>
    </el-drawer>
    <el-button style="position: fixed; top: 50%; right: 0;" @click="drawerVisible = true">打开历史记录</el-button>
  </div>
</template>

<script>
export default {
  name: 'AnswerCard',
  data() {
    return {
      student_id:'',
      txt_question: '',
      text_dialog: [],
      drawerVisible: false,
      selectedCourse: '计算机网络' // Store the selected course
    }
  },


  methods: {

    scrollToBottom() {
      this.$nextTick(() => {
        const div = document.getElementById('dialog_container')
        div.scrollTop = div.scrollHeight
      })
    },

    createNewChat() {
      console.log('创建新聊天')
      // 实际操作，如打开一个表单或对话框等
    },
    showRecordOne() {
      fetch('http://api.xdrv.cn:52382/question_and_a/') // 替换为你的API地址
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`)
          }
          return response.json()
        })
        .then(data => {
          console.log('Fetched data:', data) // 输出获得的JSON数据

          // 假设你的API返回的数据结构中包含data数组
          if (data.data && Array.isArray(data.data)) {
            this.text_dialog = data.data.map(record => ({
              time: new Date().toLocaleString(), // 使用当前时间作为示例
              question: record.question,
              answer: record.model_answer
            }))
            this.scrollToBottom()
          } else {
            console.error('Unexpected data format:', data)
            alert('获取聊天记录失败，请重试。')
          }
        })
        .catch(error => {
          console.error('Failed to fetch list:', error)
          alert('获取聊天记录失败，请重试。')
        })
    },

    ask_question() {
      if (this.txt_question.trim() === '') {
        alert('输入不能为空')
        return
      }

      const myDate = new Date()
      this.text_dialog.push({
        time: myDate.toLocaleString(),
        question: this.txt_question,
        answer: '等待回答...'
      })
      this.scrollToBottom()

      const formData = new FormData()
      formData.append('question', this.txt_question)
      formData.append('course_id', this.courseId)

      let questionData = null

      fetch('http://api.xdrv.cn:52381/zhihuijiaoyu/text_files/', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          console.log('原始响应:', response)
          if (!response.ok) { // 检查 HTTP 状态码是否在2xx范围内
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json() // 解析 JSON 数据
        })
        .then(data => {
          console.log('解析后的数据:', data)
          if (!data.answer) { // 检查响应数据中是否有 'answer' 属性
            throw new Error('响应数据中缺少 answer 属性')
          }
          const index = this.text_dialog.length - 1
          if (index >= 0) {
            this.text_dialog[index].answer = data.answer // 更新对话框中的答案
            questionData = {
              student_id: this.user_name,
              question: this.txt_question,
              model_answer: data.answer,
              subject: this.selectedCourse
            }
            console.log('第二个请求发送的数据:', questionData) // 打印发送的数据格式
            return fetch('http://api.xdrv.cn:52382/question_and_a/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(questionData)
            })
          }
        })
        .then(response => {
          if (response) {
            console.log('第二个请求的原始响应:', response)
            if (!response.ok) { // 检查 HTTP 状态码是否在2xx范围内
              throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // 解析 JSON 数据
          }
        })
        .then(data => {
          if (data) {
            console.log('第二个请求解析后的数据:', data)
            // 处理第二个请求的响应数据（如果需要）
          }
        })
        .catch(error => {
          console.error('Error during requests:', error)
          const index = this.text_dialog.length - 1
          if (index >= 0) {
            // this.text_dialog[index].answer = '获取答案失败，请重试。' // 设置错误消息
          }
        })
        .finally(() => {
          // 这里可以放置清理代码，例如隐藏加载指示器等
          console.log('请求完成')
        })
      this.txt_question = ''
    }
  },



}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 确保容器宽度填满可用空间 */
}

.drawer-button {
  padding: 10px 2%;
  width: 95%; /* 减去左右的内边距后的宽度 */
  margin-bottom: 10px; /* 按钮之间的间隔 */
  text-align: center; /* 文本居中显示 */
}

.box-card {
  margin: 2% auto; /* 保持上下的 margin，同时自动调整左右 margin 来居中 */
  width: 60%; /* 或者调整为需要的宽度比例 */
  min-width: 600px;
  text-align: left;
  position: relative; /* 可能需要相对定位来调整内部元素 */
  left: -12%; /* 根据需要向左或右调整位置 */
}

#dialog_container {
  overflow: auto;
  min-height: calc(100vh - 360px);
  max-height: calc(100vh - 360px);
}

.dialog-item {
  margin-bottom: 20px;
}

.question-card, .answer-card {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.question-card {
  background-color: #f1f1f1;
  text-align: right;
}

.answer-card {
  background-color: #d1f5d3;
  text-align: left;
}

.user-info-right, .user-info-left {
  font-size: 12px;
  color: #888;
}

.question-content, .answer-content {
  font-size: 15px;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ask-button {
  margin-left: 10px;
}
</style>
