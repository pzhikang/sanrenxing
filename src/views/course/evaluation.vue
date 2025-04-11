<template>
  
  <!-- 将所有内容包裹在一个根元素中 -->
  <div class="quiz-container">
    <div class="select-container">
      <button 
  class="big-button light-blue-button"
        @click="prevQuestion" 
        :disabled="currentQuestionIndex === 0"
      >上一题</button>
      <!-- 修改后代码（固定为"网络传播概论"） -->
      <select 
  v-model="selectedCourse" 
  @change="handleCourseChange(selectedCourse)"
  class="course-select"
>
  <option 
    v-for="course in courseNames" 
    :key="course" 
    :value="course"
  >
    {{ course }}
  </option>
</select>
<button 
  class="big-button light-blue-button"
  @click="nextQuestion"
  :disabled="false" 
>
  下一题
</button>
    </div>
    <form @submit.prevent="showExplanations">
      <div v-if="questions.length > 0" class="question">
        <p class="question-text">{{ currentQuestion.text }}</p>
        <div 
          v-for="(option, optionIndex) in currentQuestion.options" 
          :key="option"
          class="option-container"
        >
          <label>
            <input
              v-model="answers[currentQuestionIndex]"
              type="radio"
              :name="'question' + currentQuestionIndex"
              :value="option"
              hidden
              @change="handleAnswerSelect"
            >
            <span 
              class="option-letter"
              :class="{
                'selected': answers[currentQuestionIndex] === option,
                'correct-answer': shouldHighlightCorrect(option),
                'wrong-answer': shouldHighlightWrong(option)
              }"
            >
              <span v-if="shouldHighlightCorrect(option)" class="icon">✔</span>
              <span v-else-if="shouldHighlightWrong(option)" class="icon">✗</span>
              <span v-else>{{ String.fromCharCode(65 + optionIndex) }}</span>
            </span>
            <span 
              class="option-text"
              :class="{
                'correct-text': shouldHighlightCorrect(option),
                'wrong-text': shouldHighlightWrong(option)
              }"
            >
              {{ option }}
            </span>
          </label>
        </div>
        <transition name="fade">
          <div v-if="showExplanation" class="explanation-box">
    <p class="correct-answer-text">
      正确答案：{{ getCorrectAnswerLabel(currentQuestion) }}
    </p>
    <div class="explanation-divider"></div>
    <p class="explanation-title">试题解析</p>
    <p class="explanation-text">{{ currentQuestion.explanation }}</p>
  </div>
        </transition>
      </div>
    </form>
    <!-- 修改功能栏 -->
    <div class="function-bar">
       <!-- 收藏按钮：空心小星星 -->
       <button class="favorite-button" @click="toggleFavorite">
                <!-- 修改为直接使用图标组件 -->
             
            </button>
    <!-- 对错记录：一红一绿小圆圈 -->
    <div class="record-container">
        <div class="record-item">
          <span class="correct-record">✔</span>
          <span class="record-count">{{ correctCount }}</span> <!-- 正确次数 -->
        </div>
        <div class="record-item">
          <span class="wrong-record">✗</span>
          <span class="record-count">{{ wrongCount }}</span> <!-- 错误次数 -->
        </div>
      </div>
      <!-- 答题卡按钮：灰色答题卡图标
      <button class="answer-card-button" @click="showAnswerCard">
        <span class="card-icon">📋</span>  灰色答题卡图标 -->
      <!-- </button> --> 
    </div>

</div>


  
</template>

<script>


export default {
  name: 'Evaluation',

  data() {
    return {
      selectedCourse: '', // 初始为空，mounted 后设置
    courseNames: [],   // 存储课程名称列表
    courses: []   ,     // 存储完整的课程数据
      currentQuestionIndex: 0,
      courseIds: '',
      // courseNames: '',
      questions: [],
      answers: [],
      analysis: [],
      selectedCourse: "网络传播概论", // 直接设置为固定值
      showExplanation: false,
      courses: [], // 存储从后端获取的科目列表
      selectedSubject: '', // 当前选中的科目
      isFavorite: false, // 新增：收藏状态
      correctCount: 0, // 新增：正确次数
      wrongCount: 0 // 新增：错误次数
    }
  },
  computed: {
    // 新增计算属性获取当前题目
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || {}
    }
  },
  mounted() {
    this.fetchCourses(); // 获取课程数据
    this.resetPages()
  },
  methods: {



// 新增方法：切换收藏状态
toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      console.log('收藏状态:', this.isFavorite ? '已收藏' : '未收藏');
    },

    // 新增方法：显示答题卡
    showAnswerCard() {
      alert('答题卡功能待实现');
    },

  // 处理答题逻辑
  handleAnswerSelect() {
      this.showExplanation = true;
      const selectedAnswer = this.answers[this.currentQuestionIndex];
      const correctAnswer = this.currentQuestion.correct;

      // 判断答题是否正确，并更新计数
      if (selectedAnswer === correctAnswer) {
        this.correctCount++; // 答对，正确次数加1
        console.log('答对了！正确次数:', this.correctCount);
      } else {
        this.wrongCount++; // 答错，错误次数加1
        console.log('答错了！错误次数:', this.wrongCount);
      }

      this.$nextTick(() => {
        this.showExplanations();
      });
    },
    // 条件判断方法
    shouldHighlightCorrect(option) {
      return this.showExplanation && option === this.currentQuestion.correct
    },

    shouldHighlightWrong(option) {
      return this.showExplanation && 
        this.answers[this.currentQuestionIndex] === option &&
        option !== this.currentQuestion.correct
    },

    // 获取正确答案标签（带颜色）
    getCorrectAnswerLabel(question) {
      const correctIndex = question.options.findIndex(opt => opt === question.correct)
      if (correctIndex === -1) return ''
      return `<span class="correct-answer">${String.fromCharCode(65 + correctIndex)}: ${question.correct}</span>`
    },
    nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // 正常切换到下一题
      this.currentQuestionIndex++;
      this.showExplanation = false;
    } else {
      // 已经是最后一道题，触发重新拉取习题
      this.resetQuestions();
    }
  },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.showExplanation = false;
      }
    },
    // 修改样式获取方法
    getQuestionClass(index) {
      return {
        'correct-answer': this.answers[index] === this.questions[index]?.correct,
        'wrong-answer': this.answers[index] && this.answers[index] !== this.questions[index]?.correct
      }
    },
    // 修改getOptionClass方法
getOptionClass(option, questionIndex) {
  const hasAnswered = this.answers[questionIndex];
  return {
    // 仅在有答案时显示正确答案
    'correct-answer': hasAnswered && option === this.currentQuestion.correct,
    // 错误答案判断保持不变
    'wrong-answer': this.answers[questionIndex] === option && 
                   option !== this.currentQuestion.correct
  };
},
    // 修改重置题目方法
    resetQuestions() {
      // 保持原有逻辑...
      // 获取当前选中的课程名称
  const selectedCourseName = this.selectedCourse;
  if (!selectedCourseName) {
    alert('请先选择课程');
    return;
  }

  // 从本地存储中获取所有 subject
  const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];

  // 找到与当前选中课程对应的 subject
  const selectedSubject = allSubjects.find(subjectItem => {
    const [, courseName] = subjectItem.split('_'); // 分割 subject，获取课程名称
    return courseName === selectedCourseName;
  });

  if (!selectedSubject) {
    console.error('未找到与当前课程对应的 subject');
    alert('未找到对应的课程信息，请重试。');
    return;
  }

  console.log('当前选中的 subject:', selectedSubject);

  // 从 localStorage 中获取 student_id
  const student_id = localStorage.getItem('student_id');
  if (!student_id) {
    console.error("未找到 student_id，请先登录或完成相关操作");
    return;
  }

  // 使用模板字符串动态生成 API URL
  const apiUrl = `http://api.xdrv.cn:52382/show_multiple_c/?subject=  ${encodeURIComponent(selectedSubject)}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        console.log('原始响应:', response);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json(); // 解析 JSON 数据
    })
    .then(data => {
      console.log('接收到的数据:', data); // 控制台输出查看接收到的数据

      // 验证数据格式
      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error('Invalid data format: expected a non-empty array of questions');
      }

      // 映射数据到 questions
      this.questions = data.data.map(item => {
        const correctOption = item.answer;
        const correctAnswerMap = {
          A: item.A,
          B: item.B,
          C: item.C,
          D: item.D
        };
        return {
          text: item.question,
          options: [item.A, item.B, item.C, item.D],
          correct: correctAnswerMap[correctOption],
          subject: item.subject,
          chapter: item.chapter,
          explanation: item.analysis
        };
      });

      // 初始化 answers 数组
      this.answers = Array(this.questions.length).fill('');
      this.showExplanation = false;
    })
    .catch(error => {
      console.error('Failed to fetch questions:', error);
      alert(`Failed to fetch new questions: ${error.message}`);
    });
      this.currentQuestionIndex = 0 // 重置索引
    },
    // 在获取新题目时重置索引
    handleCourseChange(value) {
      this.selectedCourse = value;  
  console.log(`Selected course name: ${value}`);  

  // 从本地存储中获取所有subject  
  const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];  
  
  // 筛选出与选中课程对应的subject  
  const selectedSubject = allSubjects.find(subjectItem => {  
    const [courseId, courseName] = subjectItem.split('_');  
    return courseName === value;  
  });  

  if (selectedSubject) {  
    this.sendSubjectToBackend(selectedSubject);  
  } else {  
    console.error('未找到对应的subject');  
    this.resetPage(); // 如果找不到subject，fallback到刷新题目  
  }  
      
      this.currentQuestionIndex = 0
      // 原有逻辑...
    },
    async getStudentId() {
  try {
    
    // 从 localStorage 中获取 student_id
    const student_id = localStorage.getItem('student_id');
    if (!student_id) {
      console.error("未找到 student_id，请先登录或完成相关操作");
      return;
    }
    this.student_id = student_id; // 确保将获取到的 student_id 赋值给 data 中的 student_id
  }
  catch (error) {
    console.error("发生错误：", error);
}
},
async fetchCourses() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('未找到有效的token');
    alert('请先登录');
    return;
  }

  try {
    const url = 'http://182.92.182.44:8001/Course_selection/get_courses/';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    console.log('后端返回的完整数据:', data);

    if (data && Array.isArray(data.courses) && data.courses.length > 0) {
      this.courses = data.courses.map(course => ({
        id: course.id,
        name: course.name,
        subject: course.combined
      }));

      this.courseNames = this.courses.map(course => course.name);
      this.allSubjects = this.courses.map(course => course.subject);

      // 设置默认选中的课程（第一个或本地存储的）
      this.selectedCourse = 
        localStorage.getItem('selectedCourse') || 
        this.courseNames[0] || 
        '';

      // 缓存数据
      localStorage.setItem('courseNames', JSON.stringify(this.courseNames));
      localStorage.setItem('allSubjects', JSON.stringify(this.allSubjects));
      localStorage.setItem('selectedCourse', this.selectedCourse);

      console.log('课程数据初始化完成');
    } else {
      console.error('后端返回的数据格式不正确');
      alert('获取课程列表失败，请重试。');
    }
  } catch (error) {
    console.error('获取课程失败:', error);
    alert('获取课程列表失败，请稍后重试。');
  }
},
handleCourseChange(value) {  
  this.selectedCourse = value;  
  console.log(`Selected course name: ${value}`);  

  // 从本地存储中获取所有subject  
  const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];  
  
  // 筛选出与选中课程对应的subject  
  const selectedSubject = allSubjects.find(subjectItem => {  
    const [courseId, courseName] = subjectItem.split('_');  
    return courseName === value;  
  });  

  if (selectedSubject) {  
    this.sendSubjectToBackend(selectedSubject);  
  } else {  
    console.error('未找到对应的subject');  
    this.resetPage(); // 如果找不到subject，fallback到刷新题目  
  }  
},  
sendSubjectToBackend(subject) {  
  // 确保URL正确，没有多余的空格  
  const url = `http://api.xdrv.cn:52382/show_multiple_c/?subject=${encodeURIComponent(subject)}`;  

  fetch(url, {  
    method: 'GET',  
    headers: {  
      'Content-Type': 'application/json',  
    },  
  })  
    .then(response => {  
      if (!response.ok) {  
        throw new Error(`Network response was not ok: ${response.statusText}`);  
      }  
      return response.json();  
    })  
    .then(data => {  
      console.log('后端响应：', data);  
      // 假设后端返回的是包含题目数据的对象，例如data.data为数组  
      if (data && data.data) {  
        this.questions = data.data.map(item => {  
          // 根据实际数据结构调整映射逻辑  
          const correctOption = item.answer;  
          const correctAnswerMap = {  
            A: item.A,  
            B: item.B,  
            C: item.C,  
            D: item.D  
          };  
          return {  
            text: item.question,  
            options: [item.A, item.B, item.C, item.D],  
            correct: correctAnswerMap[correctOption],  
            subject: item.subject,  
            chapter: item.chapter,  
            explanation: item.analysis  
          };  
        });  
        // 初始化答案数组  
        this.answers = Array(this.questions.length).fill('');  
        this.showExplanation = false;  
      } else {  
        console.log('没有获取到题目数据');  
        this.questions = [];  
        this.answers = [];  
      }  
    })  
    .catch(error => {  
      console.error('获取题目失败：', error);  
      alert('获取题目失败，请检查网络或重试');  
    });  
},  
    selectAnswer(index, option) {
      this.$set(this.answers, index, option) // 记录用户的选择
      this.showExplanation = true;
       // 自动触发查看解析，发送数据到服务器  
  this.showExplanations();  
    },
    showExplanations() {
  this.showExplanation = true; // 显示答案解析
  console.log('当前题目的正确答案:', this.currentQuestion.correct);

  // 构建要发送到服务器的数据对象（仅发送当前题目）
  const currentQuestionData = {
    question: this.currentQuestion.text,
    answer: this.currentQuestion.correct,
    subject: this.currentQuestion.subject,
    chapter: this.currentQuestion.chapter,
    student_ans: this.answers[this.currentQuestionIndex] || '--未选择--'
  };

  console.log('要发送到服务器的数据:', currentQuestionData);

  // 使用 fetch 发送数据到服务器
  fetch('http://api.xdrv.cn:52382/multiple_c_r/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([currentQuestionData]) // 将当前题目数据放入数组
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('成功发送数据到服务器:', data);
    })
    .catch(error => {
      console.error('发送数据到服务器失败:', error);
    });
},
    resetQuestions() {
  // 获取当前选中的课程名称
  const selectedCourseName = this.selectedCourse;
  if (!selectedCourseName) {
    alert('请先选择课程');
    return;
  }

  // 从本地存储中获取所有 subject
  const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];

  // 找到与当前选中课程对应的 subject
  const selectedSubject = allSubjects.find(subjectItem => {
    const [, courseName] = subjectItem.split('_'); // 分割 subject，获取课程名称
    return courseName === selectedCourseName;
  });

  if (!selectedSubject) {
    console.error('未找到与当前课程对应的 subject');
    alert('未找到对应的课程信息，请重试。');
    return;
  }

  console.log('当前选中的 subject:', selectedSubject);

  // 从 localStorage 中获取 student_id
  const student_id = localStorage.getItem('student_id');
  if (!student_id) {
    console.error("未找到 student_id，请先登录或完成相关操作");
    return;
  }

  // 使用模板字符串动态生成 API URL
  const apiUrl = `http://api.xdrv.cn:52382/show_multiple_c/?subject=${encodeURIComponent(selectedSubject)}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        console.log('原始响应:', response);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json(); // 解析 JSON 数据
    })
    .then(data => {
      console.log('接收到的数据:', data); // 控制台输出查看接收到的数据

      // 验证数据格式
      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error('Invalid data format: expected a non-empty array of questions');
      }

      // 映射数据到 questions
      this.questions = data.data.map(item => {
        const correctOption = item.answer;
        const correctAnswerMap = {
          A: item.A,
          B: item.B,
          C: item.C,
          D: item.D
        };
        return {
          text: item.question,
          options: [item.A, item.B, item.C, item.D],
          correct: correctAnswerMap[correctOption],
          subject: item.subject,
          chapter: item.chapter,
          explanation: item.analysis
        };
      });

      // 初始化 answers 数组
      this.answers = Array(this.questions.length).fill('');
      this.showExplanation = false;
    })
    .catch(error => {
      console.error('Failed to fetch questions:', error);
      alert(`Failed to fetch new questions: ${error.message}`);
    });
},
  resetPages() {

    // 使用模板字符串动态生成 API URL
    
    const apiUrl = `http://api.xdrv.cn:52382/show_multiple_c/`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          console.log('原始响应:', response);
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json(); // 解析 JSON 数据
      })
      .then(data => {
        console.log('接收到的数据:', data); // 控制台输出查看接收到的数据

        // 验证数据格式
        if (!data || !Array.isArray(data.data) || data.data.length === 0) {
          throw new Error('Invalid data format: expected a non-empty array of questions');
        }

        // 映射数据到 questions
        this.questions = data.data.map(item => {
          const correctOption = item.answer;
          const correctAnswerMap = {
            A: item.A,
            B: item.B,
            C: item.C,
            D: item.D
          };
          return {
            text: item.question,
            options: [item.A, item.B, item.C, item.D],
            correct: correctAnswerMap[correctOption],
            subject: item.subject,
            chapter: item.chapter,
            explanation: item.analysis
          };
        });

        // 初始化 answers 数组
        this.answers = Array(this.questions.length).fill('');
        this.showExplanation = false;
      })
      .catch(error => {
        console.error('Failed to fetch questions:', error);
        alert(`Failed to fetch new questions: ${error.message}`);
      });
  },
  getCorrectAnswerLabel(question) {
      const correctIndex = question.options.indexOf(question.correct)
      return correctIndex !== -1 ? String.fromCharCode(65 + correctIndex) + ': ' + question.correct : ''
    }
  }
}
</script>

<style scoped>
.fixed-subject {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f0f8ff; /* 浅蓝色背景，与按钮背景呼应 */
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px; /* 可根据实际情况调整 */
}
.nav-button {
  padding: 12px 24px;
  font-size: 18px;
  background-color: #87CEFA; /* 浅蓝色 */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover:not(:disabled) {
  background-color: #6CB4EE; /* 稍深的浅蓝色 */
}

.nav-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.correct-answer-text[data-v-76000b06] {
  font-size: 22px;
  color: #4CAF50; /* 绿色 */
  font-weight: bold;
  margin-bottom: 10px;

}

/* 正确选项样式 */
.explanation-text[data-v-76000b06] {
    font-size: 25px;
    color: #616161;
    line-height: 1.6;
}
.explanation {
  margin-top: 10px;
  font-style: italic;
}
/* 划线和解析部分 */
.explanation-divider {
  border-top: 2px solid #000; /* 划线 */
  margin: 15px 0;  /* 增加分割线间距 */
}
.explanation-title {
  font-size: 28px;  /* 增大标题字体大小 */
  font-weight: bold;
  text-align: center;
  margin: 20px 0;  /* 增加上下边距 */
  color: #333;     /* 使用深色文字 */
}
.explanation-text {
  font-size: 24px;  /* 增大解析内容字体大小 */
  color: #444;     /* 使用稍浅的深色 */
  line-height: 1.8; /* 增加行高 */
  padding: 0 10px;  /* 增加左右内边距 */
}
.question-text {
  font-size: 18px; /* 增大字体 */
  font-weight: bold; /* 加粗 */
  letter-spacing: 1px; /* 增加字间距 */
  line-height: 1.6; /* 增加行间距 */
}
.button-container {
  display: flex;
  gap: 10px; /* 添加间距 */
  justify-content: center; /* 居中对齐 */
}
.quiz-button {
  padding: 10px 20px;
}
.footer {
  color: #888;
  font-size: 11px; /* 减少版权信息的字体大小 */
}
.divider {
  border-top: 1px dashed #ccc; /* 添加浅色虚线 */
  margin: 20px 0; /* 间距 */
}
body {
    position: relative;
    padding-bottom: 60px; /* 与功能栏高度一致 */
    box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif; /* 设置默认字体 */
  line-height: 1.6; /* 设置默认行高 */
  color: #333; /* 设置默认文字颜色 */
}
.question{
  max-width: 1400px;
}
/* 容器样式 */
.quiz-container[data-v-76000b06] {
    /* max-width: 1200px; */
    margin: auto;
    padding-top: 25px;
    padding-left: 180px;
    padding-right: 180px;
    padding-bottom: 80px; /* 新增：添加底部内边距，留出功能栏空间 */
    border-radius: 8px;
    background-color: white;
    font-size: 26px;
    min-height: calc(100vh - 80px); /* 确保容器高度足够 */
}


/* 题目文本样式 */
.question-text[data-v-76000b06] {
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 0.5px;
    line-height: 1.8;
    margin-bottom: 20px;
    font-size: 30px; /* 增大题目字体 */
}

/* 选项文本样式 */
.option-text[data-v-76000b06] {
    font-size: 25px;
    line-height: 1.6;
    color: #444;
    font-size: 30px; /* 增大选项字体 */
}

/* 对号和错号样式 */
.icon {
  font-size: 25px; /* 调整对号和错号的大小 */
}

/* 选项容器样式 */
.option-container {
  margin: 15px 0; /* 增加选项间距 */
  display: flex;
  align-items: center;
}
.course-select {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f0f8ff;
  color: #333;
  min-width: 200px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
}

.course-select:focus {
  outline: none;
  border-color: #3366ff;
  box-shadow: 0 0 0 2px rgba(51, 102, 255, 0.2);
}
/* 选项字母样式 */
.option-letter {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #ddd;
  margin-right: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* 正确选项样式 */
.correct-answer {
  background-color: #4CAF50; /* 绿色背景 */
  color: white;
  border-color: #4CAF50;
}

/* 错误选项样式 */
.wrong-answer {
  background-color: #F44336; /* 红色背景 */
  color: white;
  border-color: #F44336;
}

/* 解析信息样式 */
.explanation-box[data-v-76000b06][data-v-76000b06] {
    margin-top: 20px;
    padding: 15px;
    background-color: white;
    border-radius: 2px;
    border-top: 1px solid black;
}

.correct-answer-text {
  font-size: 22px;
  color: #4CAF50; /* 绿色 */
  font-weight: bold;
  margin-bottom: 10px;
}

.explanation-text {
  color: #616161; /* 设置解析文字颜色 */
  line-height: 1.6; /* 设置解析行高 */
  font-size: 60px; /* 增大解析字体 */}

/* 按钮容器样式 */
.select-container {
  display: flex;
  justify-content: center;
  gap: 15px; /* 增加按钮间距 */
  margin: 25px 0; /* 增加垂直间距 */
}

/* 按钮样式 */
button {
  padding: 10px 20px;
  font-size: 16px; /* 设置按钮字体大小 */
  border: none;
  border-radius: 5px;
  background-color: #2196F3; /* 设置按钮背景色 */
  color: white; /* 设置按钮文字颜色 */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc; /* 设置禁用按钮背景色 */
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1976D2; /* 设置按钮悬停背景色 */
}

/* 过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* 新增底部功能栏样式 */
.function-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    height: 60px; /* 固定高度 */
    z-index: 100; /* 确保在其他内容之上 */
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1); /* 可选：添加阴影效果 */
}



.record-container {
  display: flex;
  gap: 20px;
}

.answer-card-button {
  background-color: #9C27B0;
}
/* 新增功能栏样式 */
.function-bar {
  position: fixed; /* 固定在页面底部 */
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}






/* 对错记录样式 */
.record-container {
  display: flex;
  gap: 10px;
  margin-left: auto; /* 将红绿小圆圈推到最右边 */
}

.correct-record,
.wrong-record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  color: white; /* 对错号为白色 */
}

.correct-record {
  background-color: #4CAF50; /* 绿色背景 */
}

.wrong-record {
  background-color: #F44336; /* 红色背景 */
}
.record-count {
  font-size: 16px; /* 记录数字的字体 */
  margin-top: 5px; /* 数字与圆圈的间距 */
}
.record-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 答题卡按钮样式 */
.answer-card-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px; /* 与红绿小圆圈的间距 */
}

.card-icon {
  font-size: 24px;
  color: #888; /* 灰色答题卡图标 */
}

/* 增大页面字体 */
.quiz-container {
  font-size: 18px; /* 增大整体字体 */
}

.question-text {
  font-size: 22px; /* 增大题目字体 */
}

.explanation-box {
  margin-top: 10px; /* 横线向下贴近 */
  padding-top: 10px;
  border-top: 2px solid #000; /* 划分题目与解析的横线 */
}

/* 答题正确或错误的样式 */
.correct-answer {
  background-color: #4CAF50; /* 答题正确变绿色 */
  color: white;
}

.wrong-answer {
  background-color: #F44336; /* 答题错误变红色 */
  color: white;
}
/* 如果需要调整禁用状态下的样式 */
.el-select.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #606266;
  cursor: not-allowed;
}
</style>