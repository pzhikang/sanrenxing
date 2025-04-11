<template>
  <div v-if="!selectedCourse">
    <el-card class="course-selection">
      <el-button
  v-for="(courseName, index) in courseNames"
  :key="index"
  @click="selectCourse(courseName)"
  class="course-button"
>
  {{ courseName }}的习题
  <!-- <span class="question-count">道</span> 假设根据索引获取习题数量 -->
</el-button>
    </el-card>
  </div>
  <div v-else>
    <el-table :data="questions" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column prop="content" label="题目">
  <template slot-scope="scope">
    <div v-if="editingIndex === scope.$index">
      <!-- 题目内容 -->
      <el-input v-model="scope.row.question" placeholder="请输入题目内容"></el-input>
      <!-- 选项 A -->
      <el-input v-model="scope.row.options[0]" placeholder="请输入选项A"></el-input>
      <!-- 选项 B -->
      <el-input v-model="scope.row.options[1]" placeholder="请输入选项B"></el-input>
      <!-- 选项 C -->
      <el-input v-model="scope.row.options[2]" placeholder="请输入选项C"></el-input>
      <!-- 选项 D -->
      <el-input v-model="scope.row.options[3]" placeholder="请输入选项D"></el-input>
      <!-- 答案 -->
      <el-input v-model="scope.row.answer" placeholder="请输入答案"></el-input>
      <!-- 解析 -->
      <el-input v-model="scope.row.analysis" placeholder="请输入解析"></el-input>
    </div>
    <div v-else style="color: black;">
      <!-- 显示题目内容 -->
      <div>{{ scope.row.question }}</div>
      <!-- 显示选项 -->
      <div>A. {{ scope.row.options[0] }}</div>
      <div>B. {{ scope.row.options[1] }}</div>
      <div>C. {{ scope.row.options[2] }}</div>
      <div>D. {{ scope.row.options[3] }}</div>
      <!-- 显示答案 -->
      <div>答案：{{ scope.row.answer }}</div>
      <!-- 显示解析 -->
      <div>解析：{{ scope.row.analysis || '暂无解析' }}</div>
    </div>
  </template>
</el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)" style="color: black;"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"></path><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"></path></svg>
              编辑</el-button>

            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)" style="color: black;"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4"></path></svg>
              删除</el-button>
              <el-button v-if="editingIndex === scope.$index" type="text" size="small" @click="handleSave(scope.$index, scope.row)" style="color: black;">
                保存</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
    selectedQuestions: [],  
    editingIndex: -1  
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
      const url = `http://api.xdrv.cn:52381/djangoZhiHuiShu/get_questions/`;

      // 准备发送的数据
      const postData = {
        subject: subject, // 直接使用筛选出的 subject
        difficulty: 0 // 添加 difficulty 变量，值为 0
      };

      // 打印传输的数据
      console.log('发送到后端的数据:', postData);

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('后端响应：', data);
          // 假设后端返回的是题目列表
          this.questions = Array.isArray(data) ? data : []; // 确保 data 是数组
        })
        .catch(error => {
          console.error('请求失败：', error);
        });
    },

    handleEdit(index, row) {
      // 编辑操作
      this.editingIndex = index;
      console.log('编辑', index, row);
    },
    handleDelete(index, row) {
    console.log('删除', index, row);

    // 调用后端接口删除题目
    const url = `http://api.xdrv.cn:52381/djangoZhiHuiShu/delete_question/${row.id}/`; // 使用题目 ID 动态构建 URL
    fetch(url, {
      method: 'DELETE', // 使用 DELETE 方法
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // 解析响应体
      })
      .then(data => {
        console.log('题目删除成功:', data);
        // 从前端列表中移除已删除的题目
        this.questions.splice(index, 1);
        alert('题目删除成功');
      })
      .catch(error => {
        console.error('题目删除失败:', error);
        this.questions.splice(index, 1);
        // 根据错误状态码显示不同的提示信息
        if (error.message.includes('404')) {
          alert('题目不存在，请刷新页面后重试。');
        } 
      });
  },
    handleSave(index, row) {
    this.editingIndex = -1; // 退出编辑模式
    console.log('保存', index, row);

    // 将修改后的数据发送到后端
    const updatedQuestion = {
      question: row.question, // 题目内容
      options: row.options, // 选项
      answer: row.answer, // 答案
      analysis: row.analysis, // 解析（注意：后端字段是 analysis，前端字段是 explanation）
    };

    // 调用后端接口保存数据
    const url = `http://api.xdrv.cn:52381/djangoZhiHuiShu/update_question/${row.id}/`; // 使用题目 ID 动态构建 URL
    fetch(url, {
      method: 'PUT', // 使用 PUT 方法
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedQuestion), // 发送更新后的题目数据
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('题目更新成功:', data);
        // 更新前端数据
        this.questions.splice(index, 1, data.data); // 替换当前题目为更新后的题目
      })
      .catch(error => {
        console.error('题目更新失败:', error);
        // 根据错误状态码显示不同的提示信息
        if (error.message.includes('404')) {
          alert('题目不存在，请刷新页面后重试。');
        } else if (error.message.includes('400')) {
          alert('选项格式不正确，请检查选项内容。');
        } else {
          
        }
      });
  },
    handleSelectionChange(selection) {
      this.selectedQuestions = selection;
      console.log('选中的题目:', this.selectedQuestions);
      // 这里可以调用后端接口传输选中的题目数据
      this.$axios.post('/api/selected-questions', { selectedQuestions: this.selectedQuestions })
        .then(response => {
          console.log('选中的题目已成功提交到后端:', response.data);
        })
        .catch(error => {
          console.error('提交选中的题目时出错:', error);
        });
    }
  },
  created() {
    // 移除原有的模拟数据加载
  }
};
</script>
<style scoped>
.course-selection {
  padding: 20px;
  text-align: center;
}
.course-button {
  width: 258px; /* 设置按钮宽度 */
  height: 135px; /* 设置按钮高度 */
  margin: 10px; /* 设置按钮间距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  position: relative;
  border-radius: 10px;
  word-break: break-word; /* 允许单词内换行 */
  white-space: normal; /* 允许文本换行 */
  vertical-align: top; /* 关键修复 - 确保所有按钮顶部对齐 */
  display: inline-block; /* 如果按钮是行内排列，需要这个属性 */
}
.course-button{
  font-size: 22px;
}
.question-count {
  position: absolute;
  bottom: 12px;
  right: 14px;
  font-size: 12px;
  color: #666;
}
.left-menu, .right-menu {
display: flex;
align-items: center;
}
.question-list {
margin-top: 20px;
}

svg{
  position: relative;
  top: 9px;
}
.heard{
  font-size: 20px;
  font-weight: 600;
}
.options{
  margin-top: 35px;
    font-size: 17px;
}
.edit-question{
  position: relative;
}
.baoc{
  position: absolute;
  top: 289px;
  right: 10px;
  width: 78px;
    height: 45px;
    background-color: blue;
    border-radius: 10px;
    font-size: 20px;
}
.box1{
  font-size: 17px;
  position: relative;
  right: 24px;
  margin-bottom: 20px;
}
.cz {
  position: relative;
  right: 30px; /* 修改为30px，即往左移动20px */
}
.back-button{
  position: absolute;
  right: 0%;
  top: 1%;
}
</style>