<template>  
  <div class="container">  
    <div class="inner-container">  
      <div class="text-container">  
        <h3>学情分析</h3>  
        <p>  
          基于当前数据，学情分析显示各学科的正确率，可以帮助我们更好地了解学生在不同学科的掌握情况。  
        </p>  
      </div>  
      <div class="chart-container">  
        <h2>学科正确率分析</h2>  
        <div class="dropdown">  
          <div v-cloak>
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
        </div>  
        <canvas id="myBarChart"></canvas>  
      </div>  
    </div>  
    <!-- 底部版权信息 -->  
    <footer>  
      <p>版权所有© 2024 长春理工大学人工智能学院认知推理与决策智能实验室</p>  
    </footer>  
  </div>  
</template>

<script>  
import Chart from 'chart.js'  

export default {  
  data() {  
    return {  
      courseIds: [],
      courseNames: [], // 存储从 fetchCourses 中获取的课程名称  
      rates: [], // 存储从新接口获取的正确率  
      selectedCourseName: '', // 当前选中的课程名称  
      myBarChart: null,  
      analysisText: '基于当前数据，学情分析显示各学科的正确率，可以帮助我们更好地了解学生在不同学科的掌握情况。'  ,
      isRequesting: false,
      previousSelectedCourseName: ''
    }  
  },  
  mounted() {  
    this.fetchCourses()  
    this.fetchData()  
    this.$nextTick(() => {  
      this.createChart()  
    })  
  },  
  methods: {  
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
        const url = 'https://sanrenxing.wihealth.com.cn/Course_selection/teacher_courses/';  
        const response = await fetch(url, {  
            method: 'GET',  
            headers: {  
                'Authorization': `Bearer ${token}`  
            }  
        });  

        const data = await response.json();  
        console.log('后端返回的完整数据:', data);  

        if (data && data.status === "success" && Array.isArray(data.data) && data.data.length > 0) {  
            this.courseNames = data.data.map(course => course.course_name);   
            this.courseIds = data.data.map(course => course.course_id);  
            console.log('提取后的课程名称:', this.courseNames);  
            console.log('提取后的课程名称:', this.courseIds); 
            if (this.courseNames.length === 0) {  
                console.log('后端返回的数据中没有有效的课程名称');  
                alert('获取课程列表失败，请重试。');  
            } else {  
                // this.sendCourseNamesToServer();  
                console.log('课程获取成功:', this.courseNames);  
                
                // 缓存课程名称到本地存储  
                localStorage.setItem('courseNames', JSON.stringify(this.courseNames));  
                console.log('课程名称已缓存到本地存储');  
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
    // async sendCourseNamesToServer() {  
    //   try {  
    //     const response = await fetch('http://182.92.182.44:8002/get_rates', {  
    //       method: 'POST',  
    //       headers: {  
    //         'Content-Type': 'application/json'  
    //       },  
    //       body: JSON.stringify({  
    //         courseNames: this.courseNames  
    //       })  
    //     })  

    //     const result = await response.json()  
    //     if (result && result.rates) {  
    //       this.rates = result.rates  
    //       this.createChart()  
    //       console.log('Rates obtained successfully:', result.rates)  
    //     } else {  
    //       console.error('无效的数据格式')  
    //     }  
    //   } catch (error) {  
    //     console.error('Failed to get rates:', error)  
    //   }  
    // },  

    async fetchData() {
  const result = await fetch('http://api.xdrv.cn:52382/create_result_table').then(response => response.json());
  if (Array.isArray(result.data)) {
   
    this.rates = result.data.map(item => item.rate); // 确保 rates 和 courseNames 顺序一致
    console.log('rate',result),
    this.createChart(); // 数据加载完成后再创建图表
  }
},
    createChart() {  
  try {  
    console.log('开始创建图表...');  
    const ctx = document.getElementById('myBarChart').getContext('2d');  
    console.log('canvas元素存在，getContext成功。');  
    
    if (this.myBarChart) {  
      console.log('销毁已存在的图表...');  
      this.myBarChart.destroy();  
    }  
    console.log('初始化新的图表...');  
    this.myBarChart = new Chart(ctx, {  
      type: 'bar',  
      data: {  
        labels: this.courseNames,  
        datasets: [{  
          label: '正确率',  
          data: this.rates,  
          backgroundColor: 'rgba(54, 162, 235, 0.6)',  
          borderColor: 'rgba(54, 162, 235, 1)',  
          borderWidth: 1  
        }]  
      },  
      options: {  
        scales: {  
          y: {  
            beginAtZero: true,  
            ticks: {  
              callback: value => (value * 100).toFixed(2) + '%' // 显示百分比  
            }  
          }  
        }  
      }  
    });  
    console.log('图表创建成功。');  
  } catch (error) {  
    console.error('创建图表失败:', error);  
  }  
}  ,
handleSubjectChange(selectedCourseName) {
  if (this.isRequesting) {
      alert('点击太快啦,请等待解析后再点击');
      this.selectedCourseName = this.previousSelectedCourseName;
      return;
    }
    this.isRequesting = true;
    this.previousSelectedCourseName = this.selectedCourseName;
  console.log('选中的课程:', selectedCourseName);

  // 从 localStorage 中获取 student_id
  const studentId = localStorage.getItem('student_id');
  if (!studentId) {
    console.error('未找到 student_id');
    alert('请先登录');
    return;
  }

  // 从 allSubjects 中筛选出与 courseName 匹配的 subject
  const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];
  const selectedSubject = allSubjects.find(subject => {
    const [, name] = subject.split('_'); // 分割 id_name，获取 name
    return name === selectedCourseName;
  });

  if (selectedSubject) {
    console.log('筛选出的 subject:', selectedSubject);

    // 找到所选课程的索引
    const index = this.courseNames.indexOf(selectedCourseName);
    if (index !== -1) {
      // 获取对应的正确率
      const rate = this.rates[index];
      // 将正确率转换为百分比并显示
      this.analysisText = `当前课程的正确率为：${(rate * 100).toFixed(2)}%`;
    } else {
      this.analysisText = '未找到该课程的正确率';
    }

    // 构造 URL 编码的参数
    const params = new URLSearchParams();
    params.append('subject', selectedSubject);

    // 发送请求到 http://api.xdrv.cn:52382/rate/
    fetch('http://api.xdrv.cn:52382/create_chapter_rate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(), // 使用 URL 编码的参数
    })
      .then(response => response.json())
      .then(result => {
        console.log('请求返回的数据:', result);
        if (result  && Array.isArray(result.rates)) {
          // 处理章节正确率数据
          this.processChapterData(result.rates);
        } else {
          console.error('请求返回的数据格式不正确:', result);
        }
      })
      .catch(error => {
        console.error('请求数据失败:', error);
      });
      this.analysisText = '解析中，请稍后...';
    // 新增调用 zhihuijiaoyu/get_analysis/ 接口的逻辑
    // 构造 FormData 参数
    const formData = new FormData();
    formData.append('subject', selectedSubject);
    formData.append('wenti', 0);
    formData.append('zuoti', 0);
    console.log('传的数据 (FormData):');
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }


    fetch('http://api.xdrv.cn:52381/zhihuijiaoyu/get_analysis/', {
      method: 'POST',
      body: formData // 使用 FormData 作为请求体
    })
      .then(response => response.json())
      .then(result => {
        console.log('分析请求返回的数据:', result);
        if (result && result.answer) {
          // 将返回的 analysis 展示在 analysisText 上
          this.analysisText = result.answer;
          this.isRequesting = false;
        } else {
          console.error('分析请求返回的数据格式不正确:', result);
          this.analysisText = '未获取到分析数据';
        }
      })
      .catch(error => {
        console.error('分析请求数据失败:', error);
        this.analysisText = '获取分析数据失败';
      });
  } else {
    console.error('未找到与 courseName 对应的 subject');
    this.isRequesting = false; // 请求失败时重置标志
  }
},
processChapterData(chapterRates) {
  if (!Array.isArray(chapterRates)) {
    console.error('章节数据不是数组:', chapterRates);
    return;
  }

  // 更新图表
  this.updateChart(chapterRates);
},  

updateChart(chapterRates) {
  if (this.myBarChart) {
    this.myBarChart.destroy();
  }

  const ctx = document.getElementById('myBarChart').getContext('2d');
  this.myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['章节1', '章节2', '章节3', '章节4', '章节5', '章节6', '章节7'],
      datasets: [ {
        label: '章节正确率',
        data: chapterRates,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => (value * 100).toFixed(2) + '%', // 显示百分比
          },
        },
      },
    },
  });
},
  }  
}  
</script>  
<style scoped>
.container {
  transform: translateY(150px);
}
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: space-between;
}

.inner-container {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.text-container, .chart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

footer {
  text-align: center;
  padding: 10px;
  color: #888;
  font-size: 11px;
  font-family: Arial, sans-serif;
}

h2, h3 {
  margin: 10px;
  color: #333;
  font-family: Arial, sans-serif;
}

p {
  color: #666;
  font-family: Arial, sans-serif;
  font-size: 16px;
}

canvas {
  max-width: 90%;
  max-height: 90%;
}

select {
  min-width: 200px;
  margin-bottom: 20px;
  padding: 5px;
  font-size: 16px;
}

select:disabled {
  opacity: 0.7; /* 禁用时降低透明度 */
  cursor: not-allowed; /* 禁用时显示禁止光标 */
}

</style>
