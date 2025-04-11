<template>
  <div>
    <div v-if="!selectedCourse">
      <el-card class="course-selection">
        <el-button
          v-for="(courseName, index) in courseNames"
          :key="index"
          @click="selectCourse(courseName)"
          class="course-button"
        >
          {{ courseName }}的习题
        </el-button>
         <el-button
          class="course-button"
          @click="showUploadDialog = true"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7l-5-5l-5 5m5-5v12"></path></svg>
        自定义上传
        </el-button>
        <el-button type="primary" class="saved-button" @click="goToSaved">已存题库</el-button>
      </el-card>
    </div>
    <div v-else>
      <el-table
  :data="questions"
  v-if="questions.length > 0"
  style="width: 100%"
  @selection-change="handleSelectionChange"
>
  <el-table-column 
    type="selection" 
    width="55"
    :selectable="isSelectable"
  ></el-table-column>
  <el-table-column prop="question" label="题目">
    <template slot-scope="scope">
      <div style="color: black;">
        <!-- 显示题目内容 -->
        <div>{{ scope.row.question }}</div>
        <!-- 显示选项 -->
        <div v-if="scope.row.A">A. {{ scope.row.A }}</div>
        <div v-if="scope.row.B">B. {{ scope.row.B }}</div>
        <div v-if="scope.row.C">C. {{ scope.row.C }}</div>
        <div v-if="scope.row.D">D. {{ scope.row.D }}</div>
        <!-- 显示答案 -->
        <div v-if="scope.row.answer">答案：{{ scope.row.answer }}</div>
        <!-- 显示解析 -->
        <div v-if="scope.row.analysis">解析：{{ scope.row.analysis }}</div>
      </div>
    </template>
  </el-table-column>
</el-table>
    </div>

    <!-- 自定义上传弹窗 -->
    <div v-show="showUploadDialog" class="upload-dialog">
      <div class="upload-content">
        <h2>上传题库</h2>
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="课程名称">
            <el-select v-model="form.course_name" placeholder="请选择课程">
              <el-option
                v-for="(courseName, index) in courseNames"
                :key="index"
                :label="courseName"
                :value="courseName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传PDF文件">
            <el-upload
              class="upload-demo"
              ref="upload"
              :auto-upload="false"
              :on-change="handleFileChange"
              :limit="1"
              accept=".pdf"
            >
              <div style="display: flex; justify-content: flex-start;">
                <el-button slot="trigger" size="small" type="primary" style="width: 150px;">选取文件</el-button>
              </div>
              <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="showUploadDialog = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    const cachedSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];
    if (Array.isArray(cachedSubjects)) {
      console.log('获取到的 subject 数据:', cachedSubjects);
    } else {
      console.error('subject 数据格式不正确，期望是一个数组');
    }
    return {
      courseNames: JSON.parse(localStorage.getItem('courseNames')) || [],
      selectedCourse: null,
      questions: [],
      selectedQuestions: [], // 存储用户选中的题目
      previousSelectedQuestions: [], // 存储上一次选中的题目
      showUploadDialog: false, // 控制弹窗显示
      form: {
        student_id: '',
        course_name: '', // 选中的课程名称
        course_id: '', // 对应的课程 ID
        file: null, // 上传的 PDF 文件
      },
    };
  },
  methods: {
    selectCourse(courseName) {
      this.selectedCourse = courseName;

      // 从 allSubjects 中筛选出与 courseName 匹配的 subject
      const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];
      const selectedSubject = allSubjects.find(subject => {
        const [, name] = subject.split('_'); // 分割 id_name，获取 name
        return name === courseName;
      });

      if (selectedSubject) {
        console.log('筛选出的 subject:', selectedSubject);
        this.sendSubjectToBackend(selectedSubject); // 发送筛选出的 subject 到后端
      } else {
        console.error('未找到与 courseName 对应的 subject');
      }
    },
    sendSubjectToBackend(subject) {
  // 构造包含 subject 查询参数的 URL
  const url = `http://api.xdrv.cn:52382/show_multiple_c/?subject=${encodeURIComponent(subject)}`;

  // 打印传输的数据
  console.log('发送到后端的 subject:', subject);

  fetch(url, {
    method: 'GET', // 使用 GET 方法
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
      // 检查返回的数据是否为空
      if (!data.data || data.data.length === 0) {
        // 如果数据为空，显示"没有题"
        this.questions = [{
          question: "服务器没有返回题",
          A: "",
          B: "",
          C: "",
          D: "",
          answer: "",
          analysis: ""
        }];
      } else {
        // 确保 data 是数组
        this.questions = Array.isArray(data.data) ? data.data : [];
      }
    })
    .catch(error => {
      console.error('请求失败：', error);
      // 请求失败时也显示"没有题"
      this.questions = [{
        question: "请检查网络",
        A: "",
        B: "",
        C: "",
        D: "",
        answer: "",
        analysis: ""
      }];
    });
},
isSelectable(row) {
  // 只有当题目不是"没有题"时才可选
  return row.question !== "没有题";
},
    handleSelectionChange(selection) {
      // 检测新增的题目（本次选中但上次未选中的题目）
      const newSelections = selection.filter(
        question => !this.previousSelectedQuestions.includes(question)
      );

      // 上传新增的题目
      if (newSelections.length > 0) {
        this.uploadSelectedQuestions(newSelections);
      }

      // 更新选中的题目
      this.selectedQuestions = selection;
      this.previousSelectedQuestions = [...selection]; // 更新上一次选中的题目
      console.log('选中的题目:', this.selectedQuestions);
    },
    uploadSelectedQuestions(selectedQuestions) {
      // 获取 student_id
      const studentId = localStorage.getItem('student_id');
      if (!studentId) {
        console.error('未找到 student_id');
        alert('请先登录');
        return;
      }

      // 遍历选中的题目，构造请求体
      const requests = selectedQuestions.map(question => {
        const requestBody = {
          question: question.question, // 题目内容
          options: [question.A, question.B, question.C, question.D], // 选项
          answer: question.answer, // 答案
          course_name: this.selectedCourse, // 科目名称
          difficulty: 0, // 默认难度为简单
          chapter: '默认章节', // 默认章节
          student_id: studentId, // 学生编号
        };
        console.log('上传题目的请求体:', requestBody);

        // 调用上传题目接口
        return fetch('http://api.xdrv.cn:52381/djangoZhiHuiShu/upload_question/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('题目上传成功:', data);
            return data;
          })
          .catch(error => {
            console.error('题目上传失败:', error);
            throw error;
          });
      });

      // 批量上传题目
      Promise.all(requests)
        .then(results => {
          console.log('所有题目上传成功:', results);
        })
        .catch(error => {
          console.error('部分题目上传失败:', error);
        });
    },
    goToSaved() {
      this.$router.push('/saved/saved');
    },
    handleFileChange(file) {
      this.form.file = file.raw;
    },
    async submitForm() {
      if (!this.form.course_name) {
        this.$message.error('请选择课程');
        return;
      }
      if (!this.form.file) {
        this.$message.error('请上传PDF文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.form.file);

      // 从 localStorage 获取 courseNames 和 courseIds
      const courseNames = JSON.parse(localStorage.getItem('courseNames') || '[]');
      const courseIds = JSON.parse(localStorage.getItem('courseIds') || '[]');
      const student_id = JSON.parse(localStorage.getItem('student_id') || '[]');

      // 根据选中的 course_name 找到对应的 course_id
      const selectedCourseIndex = courseNames.indexOf(this.form.course_name);
      if (selectedCourseIndex === -1) {
        this.$message.error('未找到对应的课程 ID');
        return;
      }

      const selectedCourseId = courseIds[selectedCourseIndex];

      // 将 course_id 和 course_name 添加到 FormData
      formData.append('course_id', selectedCourseId);
      formData.append('course_name', this.form.course_name);
      formData.append('teacher_id', student_id);

      // 打印表单内容
      console.log("提交的表单内容：");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const loadingInstance = this.$loading({
        lock: true,
        text: '上传中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      try {
        const response = await axios.post('http://api.xdrv.cn:52381/djangoZhiHuiShu/deal_qa_file/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          this.$message.success(response.data.message);
        }
      } catch (error) {
        this.$message.error(error.response.data.error || '服务器错误');
      } finally {
        loadingInstance.close();
      }
    },
  },
};
</script>

<style scoped>
.course-selection {
  padding: 20px;
  text-align: left;
}
.course-button {
  width: 258px; /* 设置按钮宽度 */
  height: 135px; /* 设置按钮高度 */
  margin: 20px; /* 设置按钮间距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  position: relative;
  border-radius: 10px;
  word-break: break-word; /* 允许单词内换行 */
  white-space: normal; /* 允许文本换行 */
  vertical-align: top; /* 关键修复 - 确保所有按钮顶部对齐 */
  display: inline-block; /* 如果按钮是行内排列，需要这个属性 */
}
.course-button {
  font-size: 22px;
}
.question-count {
  position: absolute;
  bottom: 12px;
  right: 14px;
  font-size: 12px;
  color: #666;
}
.left-menu,
.right-menu {
  display: flex;
  align-items: center;
}
.question-list {
  margin-top: 20px;
}
svg {
  position: relative;
  top: 9px;
}
.heard {
  font-size: 20px;
  font-weight: 600;
}
.options {
  margin-top: 35px;
  font-size: 17px;
}
.edit-question {
  position: relative;
}
.baoc {
  position: absolute;
  top: 289px;
  right: 10px;
  width: 78px;
  height: 45px;
  background-color: blue;
  border-radius: 10px;
  font-size: 20px;
}
.box1 {
  font-size: 17px;
  position: relative;
  right: 24px;
  margin-bottom: 20px;
}
.cz {
  position: relative;
  right: 30px; /* 修改为30px，即往左移动20px */
}
.back-button {
  position: absolute;
  right: 0%;
  top: 1%;
}
.saved-button {
  position: fixed;
  right: 20px;
  bottom: 40px;
  background-color: blue;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

/* 自定义上传弹窗样式 */
.upload-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.upload-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}
</style>
