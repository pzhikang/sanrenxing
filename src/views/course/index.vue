<template>
  <div class="course-container">
    <!-- 加载状态和错误提示 -->
    <div v-if="isLoading" class="loading-message">加载中...</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <button class="blue-button" @click="navigateToForm">
      <svg viewBox="0 0 24 24" width="20" height="20" style="position: relative;top:  4px;">
                <path fill="#FFFFFF" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>新建助教</button>

    <div class="red-box-container">
      <div
        v-for="(item, index) in courseList"
        :key="index"
        class="red-box"
        @click="navigateToEditForm(index)"
      >
        <div class="box-content">
          <div class="text-side">
            <div class="subject-name">{{ item.name }}</div>
            <div class="school-and-teacher">
              {{ item.school }} - {{ item.teacher }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="!courseList.length" class="no-courses-message">请添加课程</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      courseList: [],
      isLoading: false,
      errorMessage: ''
    };
  },

  created() {
    this.fetchCourseData();
  },

  methods: {
    async fetchCourseData() {
  this.isLoading = true;
  this.errorMessage = '';

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'http://182.92.182.44:8001/Course_selection/teacher_courses/',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('完整响应数据:', response.data);

    // 1. 提取并处理课程数据
    const rawData = response.data.data || [];
    const processedCourses = rawData.map(item => ({
      id: item.course_id,
      name: item.course_name,
      subject: item.subject,
      teacher: item.teacher_name,
      school: item.school_name,
      college: item.college_name,
      category: item.course_category,
      modelType: item.model_type,
      teachingMaterials: item.teaching_materials_folder,
      files: item.file_names || []
    }));

    // 2. 存储到Vue data
    this.courseList = processedCourses;
    this.courseNames = processedCourses.map(course => course.name);
    this.courseIds = processedCourses.map(course => course.id);
    this.allSubjects = [...new Set(processedCourses.map(course => course.subject))];

    // 3. 本地缓存处理
    const cacheData = {
      courses: processedCourses,
      timestamp: new Date().getTime(),
      expiresIn: 24 * 60 * 60 * 1000 // 24小时缓存有效期
    };

    // 4. 存储到localStorage

    localStorage.setItem('courseNames', JSON.stringify(this.courseNames));
    localStorage.setItem('courseIds', JSON.stringify(this.courseIds));
    localStorage.setItem('allSubjects', JSON.stringify(this.allSubjects));

    // 5. 设置当前选中的课程（优先用缓存，否则用第一个）
    const cachedSelectedCourse = localStorage.getItem('selectedCourse');
    this.selectedCourse = cachedSelectedCourse || this.courseNames[0];
    localStorage.setItem('selectedCourse', this.selectedCourse);

    console.log('课程数据已缓存:', cacheData);

  } catch (error) {
    console.error('API 错误:', error);
    
    // 6. 失败时尝试读取缓存
  
    
    this.errorMessage = '加载课程失败，请检查网络或联系管理员';
  } finally {
    this.isLoading = false;
  }
},

// 初始化时尝试加载缓存

    navigateToForm() {
      this.$router.push('/form/index');
    },

    navigateToEditForm(index) {
  const courseData = this.courseList[index];
  this.$router.push({
    path: '/bianji/bianji',
    query: {
      course_name: courseData.name,
      school_name: courseData.school,
      college_name: courseData.college,
      teacher_name: courseData.teacher,
      course_category: courseData.category,
      model_type: courseData.modelType
    }
  });
}
  }
};
</script>

<style scoped>
.course-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.loading-message {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
}

.error-message {
  text-align: center;
  color: red;
  margin-bottom: 20px;
}

.blue-button {
  background-color: rgb(88, 152, 249);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 120px;
  line-height: bottom 20px; /* 调整 line-height 属性 */
}

.red-box-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.red-box {
  width: 300px;
  height: 130px;
  margin: 30px;
  position: relative;
  left: 4%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;

}

.box-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.subject-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.school-and-teacher {
  font-size: 14px;
  color: #666;
}

.college-name {
  font-size: 13px;
  color: #666;
}

.course-category {
  font-size: 13px;
  color: #666;
}

.course-date {
  font-size: 12px;
  color: #999;
}

.no-courses-message {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-top: 20px;
}
</style>
