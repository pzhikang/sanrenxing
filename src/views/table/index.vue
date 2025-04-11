<template>
  <div class="app-container">
    <div class="header">
      <!-- 选择科目下拉菜单 -->
    
      <el-select
  v-model="selectedCourseName"
  placeholder="请选择课程"
  @change="handleSubjectChange"
>
  <el-option
    v-for="(courseName, index) in courseNames"
    :key="index"
    :label="courseName"
    :value="courseName"
  />
</el-select>
    </div>
    <el-table
      v-loading="listLoading"
      :data="filteredData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="问题" width="300">
        <template slot-scope="scope">
          {{ scope.row.question }}
        </template>
      </el-table-column>
      <el-table-column label="正确答案" align="center">
        <template slot-scope="scope">
          {{ scope.row.answer }}
        </template>
      </el-table-column>
      <el-table-column label="学生答案" align="center">
        <template slot-scope="scope">
          {{ scope.row.student_ans }}
        </template>
      </el-table-column>
      <el-table-column label="科目" align="center">
        <template slot-scope="scope">
          {{ scope.row.subject }}
        </template>
      </el-table-column>
      <el-table-column label="章节" align="center">
        <template slot-scope="scope">
          {{ scope.row.chapter }}
        </template>
      </el-table-column>
    </el-table>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>版权所有© 2024 长春理工大学人工智能学院认知推理与决策智能实验室</strong>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseIds: '',
      courseNames: '',
      list: [],
      filteredData: [],
      listLoading: true,
      courses: [], // 存储从后端获取的科目列表
      selectedSubject: '', // 当前选中的科目
      subjectLoading: false // 科目加载状态
    }
  },
  created() {
    this.fetchData()
    this.fetchCourses(); 
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetch('http://api.xdrv.cn:52382/multiple_c_r/  ') // 替换为你的API地址
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`)
          }
          return response.json()
        })
        .then((data) => {
          console.log('Fetched data:', data) // 输出获得的JSON数据
          this.list = data.data // 假设你的API返回的数据结构中包含data数组
          this.filteredData = this.list
          this.listLoading = false
        })
        .catch((error) => {
          console.error('Failed to fetch list:', error)
          this.listLoading = false
        })
    },
    handleSubjectSelectVisible(isVisible) {
      if (isVisible && this.courses.length === 0) {
        this.fetchCourses()
      }
    },
    async fetchCourses() {  
  const token = localStorage.getItem('token');  
  if (!token) {  
    console.error('未找到有效的token');  
    alert('请先登录');  
    return;  
  }  
  if (this.loading) return;  
  this.loading = true;  

  try {  
    const url = 'https://sanrenxing.wihealth.com.cn/Course_selection/teacher_courses/ ';  
    const response = await fetch(url, {  
      method: 'GET',  
      headers: {  
        'Authorization': `Bearer ${token}`  
      }  
    });  

    const data = await response.json();  
    console.log('后端返回的完整数据:', data);  

    if (data && data.status === "success" && Array.isArray(data.data) && data.data.length > 0) {  
      // 将 course_id 和 course_name 组合成 subject
      this.courses = data.data.map(course => ({
        id: course.course_id,
        name: course.course_name,
        subject: `${course.course_id}_${course.course_name}` // 组合成 subject
      }));

      // 提取课程名称和课程ID
      this.courseNames = this.courses.map(course => course.name);   
      this.courseIds = this.courses.map(course => course.id);  

      console.log('提取后的课程名称:', this.courseNames);  
      console.log('提取后的课程ID:', this.courseIds);  
      console.log('组合后的 subject:', this.courses.map(course => course.subject));  
      const allSubjects = this.courses.map(course => course.subject);

      if (this.courseNames.length === 0) {  
        console.log('后端返回的数据中没有有效的课程名称');  
        alert('获取课程列表失败，请重试。');  
      } else {  
        this.selectedCourse = this.courseNames[0];  
        console.log('课程获取成功:', this.courseNames);  

        // 缓存课程名称、课程ID和组合后的 subject 到本地存储  
        localStorage.setItem('courseIds', JSON.stringify(this.courseIds));
        localStorage.setItem('courseNames', JSON.stringify(this.courseNames));  
        localStorage.setItem('selectedCourse', this.selectedCourse); // 缓存当前选中的课程名称
         localStorage.setItem('allSubjects', JSON.stringify(allSubjects));
        console.log('课程名称、ID 和 subject 已缓存到本地存储');  
      }  
    } else {  
      console.log('后端返回的数据格式不正确:', data);  
      alert('获取课程列表失败，请重试。');  
    }  
  } catch (error) {  
    console.error('获取课程失败:', error);  
    alert('获取课程列表失败，请稍后重试。');  
  } finally {  
    this.loading = false;  
  }  
},
    handleSubjectChange(value) {
      this.selectedSubject = value
      console.log(`Selected Subject ID: ${this.selectedSubject}`)
      this.filterData()
    },
    filterData() {
      if (this.selectedSubject) {
        this.filteredData = this.list.filter((item) => item.subject === this.selectedSubject)
      } else {
        this.filteredData = this.list
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.footer {
  color: #888;
  font-size: 11px; /* 减少版权信息的字体大小 */
}
</style>