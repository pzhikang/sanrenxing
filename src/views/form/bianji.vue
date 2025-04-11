<template>
  <div class="page-container">
  <div class="create-course">
    <div class="form-container">
      <div class="left-section">
        <form @submit.prevent="createCourse">
          <div class="form-group horizontal">
            <label for="course-name">课程名称</label>
            <input type="text" id="course-name" v-model="formData.courseName" placeholder="请输入课程名称" required />
          </div>

          <div class="form-group horizontal">
            <label for="school-name">学校名称</label>
            <input type="text" id="school-name" v-model="formData.schoolName" placeholder="请输入学校名称" required />
          </div>

          <div class="form-group horizontal">
            <label for="college-name">学院名称</label>
            <input type="text" id="college-name" v-model="formData.collegeName" placeholder="请输入学院名称" required />
          </div>

          <div class="form-group horizontal">
            <label for="teacher-name">授课教师</label>
            <input type="text" id="teacher-name" v-model="formData.teacherName" placeholder="请输入授课教师名称" required />
          </div>

          <div class="form-group horizontal">
            <label for="course-category">课程分类</label>
            <select id="course-category" v-model="formData.courseCategory" required class="no-arrow">
              <option value="理学">理学</option>
              <option value="工学">工学</option>
              <option value="管理学">管理学</option>
              <option value="文学">文学</option>
              <option value="教育学">教育学</option>
              <option value="经济学">经济学</option>
              <option value="哲学">哲学</option>
              <option value="医学">医学</option>
              <option value="法学">法学</option>
              <option value="农学">农学</option>
              <option value="艺术学">艺术学</option>
            </select>
          </div>
        </form>
      </div>
      <div class="right-section">
        <div class="form-group">
          <label class="bold-label">模型类型</label>
          <div class="model-options">
            <div class="model-row">
              <label class="model-radio">
                <input type="radio" v-model="formData.modelType" value="deepseek" required>
                <span class="radio-custom"></span>
                <span class="radio-label">deepseek</span>
              </label>
              <label class="model-radio">
                <input type="radio" v-model="formData.modelType" value="Baichuan" required>
                <span class="radio-custom"></span>
                <span class="radio-label">Baichuan</span>
              </label>
              <label class="model-radio">
                <input type="radio" v-model="formData.modelType" value="DeepSeek" required>
                <span class="radio-custom"></span>
                <span class="radio-label">DeepSeek</span>
              </label>
            </div>
            <div class="model-row">
              <label class="model-radio">
                <input type="radio" v-model="formData.modelType" value="Llama2" required>
                <span class="radio-custom"></span>
                <span class="radio-label">Llama2</span>
              </label>
              <label class="model-radio">
                <input type="radio" v-model="formData.modelType" value="InternLM" required>
                <span class="radio-custom"></span>
                <span class="radio-label">InternLM</span>
              </label>
              <label class="model-radio">
                <input type="radio" v-model="formData.modelType" value="MiniCPM" required>
                <span class="radio-custom"></span>
                <span class="radio-label">MiniCPM</span>
              </label>
            </div>
          </div>
        </div>

        <div class="upload-area">
          <div class="upload-box" @click="triggerFileInput" @dragover.prevent @drop="handleDrop">
            <div class="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16">
                <g fill="none">
                  <g clip-path="url(#gravityUiCloudArrowUpIn0)">
                    <path fill="currentColor" fill-rule="evenodd"
                      d="M4.5 5.25a3.25 3.25 0 0 1 6.398-.811a.75.75 0 0 0 .702.563A3 3 0 0 1 11.5 11h-.75a.75.75 0 0 0 0 1.5h.75a4.5 4.5 0 0 0 .687-8.948a4.751 4.751 0 0 0-9.184 1.522A3.751 3.751 0 0 0 3.75 12.5h1.5a.75.75 0 0 0 0-1.5H3.751a2.25 2.25 0 0 1-.003-4.5h.03a.75.75 0 0 0 .747-.843A3 3 0 0 1 4.5 5.25m4.25 3.31l.72.72a.75.75 0 1 0 1.06-1.06l-2-2a.75.75 0 0 0-1.06 0l-2 2a.75.75 0 0 0 1.06 1.06l.72-.72v6.69a.75.75 0 0 0 1.5 0z"
                      clip-rule="evenodd"></path>
                  </g>
                  <defs>
                    <clipPath id="gravityUiCloudArrowUpIn0">
                      <path fill="currentColor" d="M0 0h16v16H0z"></path>
                    </clipPath>
                  </defs>
                </g>
              </svg>
            </div>
            <p>点击或拖拽文件上传</p>
            <input type="file" ref="fileInput" @change="handleFileChange" multiple accept=".pdf"
              style="display: none" />
          </div>
          <div v-if="files.length > 0" class="file-list">
            <p>已选择文件：</p>
            <ul>
              <li v-for="(file, index) in files" :key="index">
                {{ file.name }}
              </li>
            </ul>
          </div>
          <div v-if="existingFiles.length > 0" class="file-list">
            <p>已上传文件：</p>
            <ul>
              <li v-for="(file, index) in existingFiles" :key="'existing-'+index">
                {{ file }}
                <button @click.stop="deleteFile(file)" class="delete-btn">删除</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="button-container">
      <div class="button-row">
        <button type="submit" @click="createCourse" class="large-button">确认编辑</button>
        <button type="button" @click="deleteAssistant" class="large-button">删除助教</button>
      </div>
      <div class="button-row">
        <button type="button" @click="goToStudent" class="large-button">进入助教</button>
      </div>
    </div>

    <div v-if="message" class="message">
      {{ message }}
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        courseName: this.$route.query.name || '',
        schoolName: this.$route.query.school|| '',
        collegeName: this.$route.query.college || '',
        teacherName: this.$route.query.teacher || '',
        courseCategory: this.$route.query.category || '',
        modelType: this.$route.query.model_type || '',
      },
      files: [],
      existingFiles: [], // 存储从后端获取的已上传文件列表
      message: '',
      username: localStorage.getItem('username') || 'default_user',
      allSubjectsFromCache: [], // 存储格式：["id_课程名称", ...]
      selectedCourseId: ''
    };
  },
  created() {
    console.log('从路由获取的课程名称:', this.$route.query.course_name);
  console.log('本地存储的 allSubjects:', localStorage.getItem('allSubjects'));
    const { course_name, teacher_name, school_name, college_name, course_category, model_type } = this.$route.query;
    this.formData.courseName = course_name || '';
    this.formData.teacherName = teacher_name || '';
    this.formData.schoolName = school_name || '';
    this.formData.collegeName = college_name || '';
    this.formData.courseCategory = course_category || '';
    this.formData.modelType = model_type || '';

    // 从本地缓存获取课程列表（格式：["id_课程名称", ...]）
    try {
      const cachedSubjects = localStorage.getItem('allSubjects');
      if (cachedSubjects) {
        this.allSubjectsFromCache = JSON.parse(cachedSubjects);
        this.findTargetCourseId();
      } else {
        console.error('本地缓存中未找到课程列表 (allSubjects)');
      }
    } catch (error) {
      console.error('解析本地缓存课程列表失败', error);
    }

    // 获取课程文件列表
    this.fetchCourseFiles();
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleDrop(e) {
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.files = Array.from(files);
    },
    handleFileChange(event) {
      const selectedFiles = event.target.files;
      this.files = Array.from(selectedFiles);
    },
    findTargetCourseId() {
  // 确保 allSubjectsFromCache 是数组
  if (!Array.isArray(this.allSubjectsFromCache)) {
    console.error('allSubjectsFromCache 不是数组', this.allSubjectsFromCache);
    this.message = '课程数据格式错误';
    return;
  }

  // 遍历查找匹配的课程
  for (const entry of this.allSubjectsFromCache) {
    // 检查 entry 是否是字符串且包含下划线
    if (typeof entry === 'string' && entry.includes('_')) {
      const [id, courseName] = entry.split('_');
      if (courseName === this.formData.courseName) {
        this.selectedCourseId = id;
        console.log('找到匹配的课程ID:', this.selectedCourseId);
        return; // 找到后立即返回
      }
    }
  }

  // 如果没有找到匹配项
  console.error('未找到匹配的课程ID', {
    courseName: this.formData.courseName,
    allSubjects: this.allSubjectsFromCache
  });
  this.message = `未找到课程 "${this.formData.courseName}" 的ID，请检查课程名称`;
},
    async fetchCourseFiles() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://182.92.182.44:8001/Course_selection/teacher_courses/',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );

        if (response.data.status === 'success') {
          // 找到当前课程的文件列表
          const currentCourse = response.data.data.find(course =>
            course.course_name === this.formData.courseName
          );

          if (currentCourse) {
            this.existingFiles = currentCourse.file_names || [];
          }
        }
      } catch (error) {
        console.error('获取课程文件列表失败:', error);
      }
    },
    async deleteFile(filename) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
          `http://182.92.182.44:8001/Course_selection/delete_file/${this.selectedCourseId}/`,
          {
            data: { filename },
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.status === 'success') {
          this.existingFiles = this.existingFiles.filter(f => f !== filename);
          this.message = '文件删除成功';
        }
      } catch (error) {
        console.error('删除文件失败:', error);
        this.message = '文件删除失败: ' + (error.response?.data?.message || '网络错误');
      }
    },
    async createCourse() {
  try {
    if (!this.selectedCourseId) {
      this.message = '未找到有效的课程ID，请检查课程名称';
      return;
    }

    console.log('当前选中的课程ID:', this.selectedCourseId);
    console.log('正在更新课程:', {
      id: this.selectedCourseId,
      name: this.formData.courseName
    });

    const formData = new FormData();
    formData.append('course_name', this.formData.courseName);
    formData.append('school_name', this.formData.schoolName);
    formData.append('college_name', this.formData.collegeName);
    formData.append('teacher_name', this.formData.teacherName);
    formData.append('course_category', this.formData.courseCategory);
    formData.append('model_type', this.formData.modelType);
    formData.append('username', this.username);

    // 上传选中的文件
    this.files.forEach((file) => {
      formData.append('file', file);
    });
    
    const requestBody = {
      course_name: this.formData.courseName,
      school_name: this.formData.schoolName,
      college_name: this.formData.collegeName,
      teacher_name: this.formData.teacherName,
      course_category: this.formData.courseCategory,
      model_type: this.formData.modelType,
      username: this.username,
      file_count: this.files.length
    };
    console.log('请求体:', requestBody);

    const token = localStorage.getItem('token');

    const response = await axios.post(
      `http://182.92.182.44:8001/Course_selection/update_course/${this.selectedCourseId}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    // 处理成功响应
    this.message = response.data.message;
    console.log('课程编辑成功:', response.data);

    // 清空已选择的文件
    this.files = [];  // 添加这行代码清空文件列表
    
    // 刷新文件列表
    await this.fetchCourseFiles();

    // 课程编辑成功后，发送额外的请求
    this.uploadAdditionalData();
  } catch (error) {
    this.message = '课程编辑失败: ' + (error.response?.data?.error || '网络错误');
    console.error('课程编辑失败:', error);
  }
},
    async deleteAssistant() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
          `http://182.92.182.44:8001/Course_selection/delete_assistant/${this.selectedCourseId}/`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );

        if (response.data.status === 'success') {
          this.message = '助教删除成功';
        }
      } catch (error) {
        console.error('删除助教失败:', error);
        this.message = '助教删除失败: ' + (error.response?.data?.message || '网络错误');
      }
    },
    goToStudent() {
      this.$router.push({
        path: '/course/teacher',
        query: {
          course: this.formData.courseName
        }
      });
    },
    async uploadAdditionalData() {
      try {
        const additionalFormData = new FormData();
        additionalFormData.append('teacher_name', this.formData.teacherName);
        additionalFormData.append('subject', this.formData.courseName);
        additionalFormData.append('model', this.formData.modelType);

        // 发送到另一个 API
        const response = await axios.post(
          'http://api.xdrv.cn:52382/upload_teacher/',
          additionalFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('额外数据上传成功:', response.data);
      } catch (error) {
        console.error('额外数据上传失败:', error);
      }
    },
  },
};
</script>

<style scoped>
.create-course {
  height: 100vh;
  padding: 80px;
  background: #fafcfd;
  border-radius: 8px;
}

.form-container {
  display: flex;
  justify-content: space-between;
}
.page-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 20px;
  background: #fafcfd;
}

/* 保持其他样式不变 */
.button-container {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 40%;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.left-section {
  width: 80%;
  margin-top: 100px;
}

.right-section {
  width: 35%;
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 100px;
}

.button-container {
  text-align: center;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input[type="file"] {
  margin-top: 10px;
}

button {
  background-color:#2196F3 ;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #2196F3;
}

.message {
  margin-top: 20px;
  padding: 10px;
  background-color: #e9f7e9;
  border: 1px solid #d4e8d4;
  border-radius: 4px;
}

.form-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.left-section {
  width: 60%;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.right-section {
  width: 40%;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-container {
  text-align: center;
  margin-top: 50px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group.horizontal {
  display: flex;
  align-items: center;
}

.form-group.horizontal label {
  width: 80px;
  margin-right: 10px;
  margin-bottom: 0;
  font-weight: 700;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 700;
}

.bold-label {
  font-weight: 700;
}

input[type="text"],
select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
}

.model-group {
  margin-bottom: 30px;
}

.model-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.model-row {
  display: flex;
  justify-content: space-between;
}

.model-radio {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  margin-right: 15px;
}

.model-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-custom {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s;
}

.model-radio:hover .radio-custom {
  border-color: #2196F3;
}

.model-radio input[type="radio"]:checked ~ .radio-custom {
  background-color: #2196F3;
  border-color: #2196F3;
}

.radio-custom:after {
  content: "";
  position: absolute;
  display: none;
}

.model-radio input[type="radio"]:checked ~ .radio-custom:after {
  display: block;
}

.model-radio .radio-custom:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.radio-label {
  margin-left: 5px;
  font-size: 14px;
}

.upload-area {
  margin-top: 50px;
}

.upload-box {
  border: 2px dashed #999;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 15px;
  background-color: #f5f5f5;
}

.upload-box:hover {
  border-color: #2196F3;
  background-color: #e9e9e9;
}

.upload-icon {
  margin-bottom: 10px;
}

.upload-box p {
  margin: 0;
  color: #555;
  font-weight: 500;
}
.upload-icon path {
  fill: #666;
}
.file-list {
  margin-top: 15px;
  font-size: 14px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}

.file-list ul {
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
}

.file-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #ff7875;
}

.confirm-button {
  background-color: #2196F3;
  color: white;
  padding: 15px 100px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.confirm-button:hover {
  background-color: #0b7dda;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.message {
  margin-top: 20px;
  padding: 10px;
  background-color: #e9f7e9;
  border: 1px solid #d4e8d4;
  border-radius: 4px;
  color: #2e7d32;
}

.no-arrow {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* 可选：添加自定义的下拉图标 */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.0rem center;
  background-size: 1.4em;
  padding-right: -110em;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  margin-left: 40%;
}

.large-button {
  padding: 12px 24px;
  font-size: 16px;
  width: 400px;
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.large-button:hover {
  background-color: #66b1ff;
}

.large-button:active {
  background-color: #3a8ee6;
}
</style>
