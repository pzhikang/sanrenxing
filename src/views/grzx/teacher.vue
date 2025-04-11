<template>
    <div>
      <!-- 设置弹窗 -->
      <div class="settings-popup" :class="{ 'moved': isMoved, 'small-margin-left2': isMarginLeftSmall }">
        <div class="settings-popup-content">
          <div class="name">设置</div>
          <div class="bigbox">
            <div class="grzl">
              <svg class="grzlsvg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 1h12.414L21 6.586V23H3zm2 2v18h14V7.414L14.586 3zm7 6a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-3.5 1.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0M6 19a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1h-2v-1a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H6z"></path>
              </svg>
              <p>通用</p>
              <svg class="grzxjt" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </div>
            <div class="jb" @click="showFeedbackPopup = true">
              <svg class="jbsvg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 256 256">
                <path fill="currentColor" d="m229.66 58.34l-32-32a8 8 0 0 0-11.32 0l-96 96A8 8 0 0 0 88 128v32a8 8 0 0 0 8 8h32a8 8 0 0 0 5.66-2.34l96-96a8 8 0 0 0 0-11.32M124.69 152H104v-20.69l64-64L188.69 88ZM200 76.69L179.31 56L192 43.31L212.69 64ZM224 128v80a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h80a8 8 0 0 1 0 16H48v160h160v-80a8 8 0 0 1 16 0"></path>
              </svg>
              <p>举报与反馈</p>
              <svg class="grzxjt" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </div>
  
            <div class="grzxbox">
              <div class="yhfw">
                <svg class="yhfwsvg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 48 48">
                  <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4" data-swindex="0">
                    <path d="M8 6a2 2 0 0 1 2-2h20l10 10v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z"></path>
                    <path stroke-linecap="round" d="M16 20h16m-16 8h16"></path>
                  </g>
                </svg>
                <p>用户服务</p>
                <svg class="grzxjt" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </svg>
              </div>
              <div class="ys">
                <svg class="yssvg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-swindex="0">
                    <path d="M21.25 6.861v6.342a2.057 2.057 0 0 1-.606 1.459l-5.982 5.982a2.055 2.055 0 0 1-1.46.606h-6.34a4.111 4.111 0 0 1-4.112-4.111V6.86a4.111 4.111 0 0 1 4.111-4.11H17.14a4.111 4.111 0 0 1 4.111 4.111"></path>
                    <path d="m14.056 21.075l-.514-4.11a3.082 3.082 0 0 1 3.443-3.444l4.11.514"></path>
                  </g>
                </svg>
                <p>隐私协议</p>
                <svg class="grzxjt" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </svg>
              </div>
              <div class="xxqd">
                <svg class="xxqdsvg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" d="M7.099 1.25H16.9c1.017 0 1.717 0 2.306.204a3.796 3.796 0 0 1 2.348 2.412l-.713.234l.713-.234c.196.597.195 1.307.195 2.36v14.148c0 1.466-1.727 2.338-2.864 1.297a.196.196 0 0 0-.271 0l-.484.442c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0l-.483-.442a.196.196 0 0 0-.272 0c-1.137 1.04-2.864.169-2.864-1.297V6.227c0-1.054 0-1.764.195-2.361a3.795 3.795 0 0 1 2.348-2.412c.59-.205 1.289-.204 2.306-.204m.146 1.5c-1.221 0-1.642.01-1.96.121A2.296 2.296 0 0 0 3.87 4.334c-.111.338-.12.784-.12 2.036v14.004c0 .12.059.192.134.227a.2.2 0 0 0 .11.018a.194.194 0 0 0 .107-.055a1.695 1.695 0 0 1 2.296 0l.483.442a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0l.483-.442a1.695 1.695 0 0 1 2.296 0c.043.04.08.052.108.055a.2.2 0 0 0 .109-.018c.075-.035.135-.108.135-.227V6.37c0-1.252-.01-1.698-.12-2.037a2.296 2.296 0 0 0-1.416-1.462c-.317-.11-.738-.12-1.959-.12zM6.25 7.5A.75.75 0 0 1 7 6.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 11a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75" clip-rule="evenodd"></path>
                </svg>
                <p>个人信息清单</p>
                <svg class="grzxjt" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="popup-content2" @click="logout">
            <svg class="tcsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                <path d="M15.99 7.823a.75.75 0 0 1 1.061.021l3.49 3.637a.75.75 0 0 1 0 1.038l-3.49 3.637a.75.75 0 0 1-1.082-1.039l2.271-2.367h-6.967a.75.75 0 0 1 0-1.5h6.968l-2.272-2.367a.75.75 0 0 1 .022-1.06"></path>
                <path d="M3.25 4A.75.75 0 0 1 4 3.25h9.455a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0V4.75H4.75v14.5h7.954V17a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75z"></path>
              </g>
            </svg>退出登录
          </div>
        </div>
      </div>
  
      <!-- 反馈弹窗 -->
      <div v-if="showFeedbackPopup" class="feedback-popup">
        <div class="feedback-content">
          <div class="feedback-header">
            <h3>提交反馈</h3>
            <span @click="showFeedbackPopup = false" class="close-btn">×</span>
          </div>
          <textarea v-model="feedbackText" placeholder="请输入您的反馈内容"></textarea>
          <button @click="submitFeedback">提交</button>
        </div>
      </div>
  
      <!-- 个人资料弹窗 -->
      <div class="grzltc" :class="{ 'moved': isMoved, 'small-margin-left3': isMarginLeftSmall }">
        <!-- <div class="tjsvg"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 20 20">
            <path fill="currentColor" d="M11 9V5H9v4H5v2h4v4h2v-4h4V9zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20"></path>
          </svg></div> -->
        <!-- <div class="tuox">
          <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0 8"></path>
          </svg>
        </div> -->
        <div class="profile-content">
          <div class="profile-item">
            <p>编辑昵称</p>
            <input type="text" v-model="userInfo.nickname" placeholder="请输入用户昵称" @keydown.enter="updateUserInfo" />
          </div>
          <div class="profile-item">
            <p>任教学校</p>
            <input type="text" v-model="userInfo.school" placeholder="请输入任教学校名称" />
          </div>
          <div class="profile-item">
            <p>任教学院</p>
            <input type="text" v-model="userInfo.college" placeholder="请输入任教学院名称" />
          </div>
          <div class="profile-item">
            <p>入职年份</p>
            <input type="text" v-model="userInfo.enrollment_year" placeholder="请输入入职年份" />
          </div>
          <div class="profile-item">
            <p>真实姓名</p>
            <input type="text" v-model="userInfo.real_name" placeholder="请输入真实姓名" />
          </div>
        </div>
        <div class="bc" @click="updateUserInfo">保存</div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userInfo: {
      nickname: '',
      school: '',
      college: '',
      major: '',
      enrollment_year: '',
      student_id: '',
      teacher_id: '',  // 新增
      title: '',       // 新增
      real_name: ''
    },
        showFeedbackPopup: false,
        feedbackText: '',
        userInfo: {
          nickname: '',
          school: '',
          college: '',
          major: '',
          enrollment_year: '',
          student_id: '',
          real_name: ''
        },
        isMoved: false,
        isMarginLeftSmall: false
      };
    },
    created() {
      this.fetchUserInfo();
    },
    methods: { async fetchUserInfo() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('未找到用户token');
          return;
        }

        // 确保token以"Bearer "开头
        const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

        const response = await axios.get('https://sanrenxing.wihealth.com.cn/Login/GetUserInfoView/', {
          headers: {
            'Authorization': authToken
          }
        });

        if (response.status === 200) {
          this.userInfo = {
            ...this.userInfo,
            ...response.data
          };
          // 如果后端返回了昵称，使用后端的昵称覆盖localStorage中的用户名
          if (response.data.nickname) {
            localStorage.setItem('username', response.data.nickname);
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            console.error('Token 无效:', error.response.data.error);
            alert('Token 无效，请重新登录');
            // 跳转到登录页面
            this.$router.push('/login');
          } else if (error.response.status === 500) {
            console.error('服务器内部错误:', error.response.data.error);
            alert('服务器内部错误，请稍后再试');
          }
        } else {
          console.error('请求出错:', error.message);
          alert('请求出错，请检查网络连接');
        }
      }
    },
  async updateUserInfo() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('未找到用户token');
      alert('请先登录');
      this.$router.push('/login');
      return;
    }

    // 获取当前用户角色
    const role = localStorage.getItem('role');
    
    // 根据角色决定调用哪个接口
    let apiUrl = '';
    let requestData = {};
    
    if (role === 'teacher') {
      apiUrl = 'https://sanrenxing.wihealth.com.cn/Login/TeacherInfoCompleteView/';
      requestData = {
        nickname: this.userInfo.nickname || '',
        school: this.userInfo.school || '',
        college: this.userInfo.college || '',
        major: this.userInfo.major || '',
        enrollment_year: this.userInfo.enrollment_year || '',
        teacher_id: this.userInfo.student_id || '', // 假设student_id字段存储的是teacher_id
        title: '', // 如果没有职称字段可以传空
        real_name: this.userInfo.real_name || ''
      };
    } else {
      // 如果是学生或其他角色，可以保留原来的逻辑或做其他处理
      apiUrl = 'https://sanrenxing.wihealth.com.cn/Login/update_user_info/';
      requestData = {
        nickname: this.userInfo.nickname || '',
        school: this.userInfo.school || '',
        college: this.userInfo.college || '',
        major: this.userInfo.major || '',
        enrollment_year: this.userInfo.enrollment_year || '',
        student_id: this.userInfo.student_id || '',
        real_name: this.userInfo.real_name || ''
      };
    }

    const response = await axios.post(
      apiUrl,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data) {
      alert('个人信息更新成功');
      // 更新本地存储的用户名
      if (this.userInfo.nickname) {
        localStorage.setItem('username', this.userInfo.nickname);
      }
      // 如果是教师且返回了teacher_id，更新本地存储
      if (role === 'teacher' && response.data.teacher_id) {
        localStorage.setItem('teacher_id', response.data.teacher_id);
      }
    }
  } catch (error) {
    console.error('更新用户信息失败:', error);
    
    if (error.response) {
      if (error.response.status === 401) {
        alert('登录已过期，请重新登录');
        this.logout();
      } else {
        alert(`更新失败: ${error.response.data.error || '请稍后再试'}`);
      }
    } else if (error.request) {
      alert('网络错误，请检查连接后重试');
    } else {
      alert('更新失败，请稍后再试');
    }
  }
},
      async submitFeedback() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('未找到用户token');
            alert('请先登录');
            this.$router.push('/login');
            return;
          }
  
          const response = await axios.post(
            'https://sanrenxing.wihealth.com.cn/Login/submit_feedback/',
            {
              feedback: this.feedbackText
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
  
          if (response.data) {
            alert('反馈提交成功');
            this.showFeedbackPopup = false;
            this.feedbackText = '';
          }
        } catch (error) {
          console.error('提交反馈失败:', error);
          alert('提交反馈失败，请稍后再试');
        }
      },
      async logout() {
        try {
          await axios.post('https://sanrenxing.wihealth.com.cn/Login/logout/', {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
  
          // 清除本地存储
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('role');
          localStorage.removeItem('student_id');
  
          // 跳转到登录页面
          this.$router.push('/login');
        } catch (error) {
          console.error('退出登录失败:', error);
          // 即使API调用失败也执行本地清理和跳转
          localStorage.clear();
          this.$router.push('/login');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式代码保持不变 */
  /* 个人中心小弹窗 */
  
  .popup-content1 {
    background-color: white;
    border-radius: 17px;
    position: absolute;
    top: 2px;
    width: 117px;
    height: 39px;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
  }
  
  .popup-content1:hover {
    background-color: #d9d9d9;
    border-radius: 15px;
    position: absolute;
    top: 2px;
    width: 117px;
    height: 38px;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
  }
  
  .xian {
    position: absolute;
    top: 50%;
  }
  
  .popup-content2 {
    background-color: white;
    border-radius: 17px;
    position: absolute;
    top: 94%;
    left: 25%;
    width: 180px;
    height: 39px;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
  }
  
  .popup-content2:hover {
    background-color: #d9d9d9;
    /* 垂直居中 */
  }
  
  .szsvg {
    color: #65bd74;
  }
  
  /* 设置弹窗 */
  
  .settings-popup {
    width: 22%;
    height: 100%;
    position: absolute;
    left: 0%;
    top: 0%;
    z-index: 100;
    background-color: #FAFCFD;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .small-margin-left2 {
    width: 1568px;
    height: 961px;
    position: absolute;
    left: 111px;
    top: -1%;
    z-index: 100;
    background-color: #FAFCFD;
  }
  
  
  .tuox {
    position: absolute;
    top: 25%;
    right: 20%;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 138px;
    height: 139px;
    border-radius: 78%;
    background-color: #FFFFFF;
  }
  
  .name {
    position: absolute;
    top: 6%;
    left: 42%;
  }
  
  .small-margin-left2 .bigbox {
    position: absolute;
    left: 116px;
    top: 0px;
  }
  
  .grzl {
    position: absolute;
    top: 128px;
    left: 1px;
    width: 335px;
    height: 40px;
    border-radius: 11px;
  }
  
  
  .jb {
    position: absolute;
    top: 179px;
    left: 1px;
    width: 335px;
    height: 40px;
    border-radius: 11px;
  }
  
  .grzxbox {
    position: absolute;
    top: 224px;
    left: 1px;
    width: 335px;
    height: 180px;
    border-radius: 11px;
  }
  
  .bigbox p {
    position: absolute;
    top: 18%;
    left: 76px
  }
  
  .grzxbox div {
    width: 335px;
    margin-top: 9px;
    margin-bottom: 11px;
    height: 40px;
    position: relative;
  }
  
  .grzlsvg {
    position: absolute;
    top: 9px;
    left: 23px;
  }
  
  .jbsvg {
    position: absolute;
    top: 9px;
    left: 23px;
    color: #3e7dd0;
  }
  
  .yhfwsvg {
    position: absolute;
    top: 9px;
    left: 23px;
  }
  
  .yssvg {
    position: absolute;
    top: 9px;
    left: 23px;
    color: #836dab;
  }
  
  .xxqdsvg {
    position: absolute;
    top: 9px;
    left: 23px;
    color: #47bd55;
  }
  
  .grzxjt {
    position: absolute;
    top: 8px;
    right: 10px;
  }
  
  /* 个人资料弹窗 */
  .grzltc {
    position: absolute;
    top: 0%;
    left: 22%;
    z-index: 108;
    width: 78%;
    height: 100%;
    background-color: #fafcfd;
  }
  
  .small-margin-left3 {
    position: absolute;
    top: 254px;
    left: 719px;
    z-index: 108;
    width: 500px;
    height: 572px;
    background-color: #FAFCFD;
  }
  
  .tjsvg {
    position: absolute;
    top: 36%;
    right: 22%;
    width: 26px;
    height: 20px;
    color: #001eff;
    z-index: 109;
  }
  
  .small-margin-left3 .tjsvg {
    position: absolute;
    top: -81px;
    left: 220px;
    width: 20px;
    height: 20px;
    color: #001eff;
  }
  
  .profile-content {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 7%;
    left: 15%;
  }
  
  .profile-item {
    width: 500px;
    height: 58px;
    /* background-color: #d9d9d9d9; */
    margin-top: 3px;
    margin-bottom: 15px;
    position: relative;
  }
  
  .profile-content p {
    position: absolute;
    top: 29px;
    left: -77px;
    font-size: 15px;
    color: #0e0e0ed6;
    font-weight: 650;
  }
  
  .profile-content input {
    position: absolute;
    left: 23px;
    top: 22px;
    width: 401px;
    height: 30px;
  }
  
  .bc {
    position: absolute;
    bottom: 0%;
    right: 38%;
    border-radius: 10px;
    width: 32%;
    height: 5%;
    background-color: #001eff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    cursor: pointer;
  }
  
  .bc:hover {
    background-color: #0018cc;
  }
  
  /* 反馈弹窗样式 */
  .feedback-popup {
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
  
  .feedback-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
  }
  
  .feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .close-btn {
    cursor: pointer;
    font-size: 24px;
  }
  
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #001eff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0018cc;
  }
  </style>
  