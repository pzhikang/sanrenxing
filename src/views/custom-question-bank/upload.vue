  <template>
    <div class="upload-container">
      <h2>上传PDF文件并生成题目</h2>
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
          action="/api/upload"
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
        </el-form-item>
      </el-form>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        courseNames: [], // 课程名称列表
        form: {
          student_id: '',
          course_name: '', // 选中的课程名称
          course_id: '', // 对应的课程 ID
          file: null, // 上传的 PDF 文件
        },
      };
    },
    methods: {
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
      // 获取课程列表
      async fetchCourses() {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$message.error('未找到有效的token，请先登录');
          return;
        }
        try {
          const url = 'https://sanrenxing.wihealth.com.cn/Course_selection/teacher_courses/';
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (data && data.status === "success" && Array.isArray(data.data) && data.data.length > 0) {
            this.courseNames = data.data.map(course => course.course_name);
            this.courseIds = data.data.map(course => course.course_id);
            this.form.course_id = this.courseIds[0];
          } else {
            this.$message.error('获取课程列表失败，请重试');
          }
        } catch (error) {
          this.$message.error('获取课程列表失败，请稍后重试');
        }
      },
    },
    mounted() {
      this.fetchCourses(); // 在组件加载时获取课程列表
    },
  };
  </script>

  <style scoped>
  .upload-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
