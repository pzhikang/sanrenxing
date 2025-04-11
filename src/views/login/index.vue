<template>
  <div class="page-container">
    <!-- 登录表单 -->
    <div class="login-form">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="qrcode-and-inputs" style="margin-top: 30px;"> <!-- 增加上外边距 -->
          <!-- 二维码区域 -->
          <div class="qrcode-area">
          </div>
          <div class="input-group-container">
            <div class="input-group">
              <label for="login-name"></label>
              <div class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="#dcdcdc" fill-rule="evenodd" d="M12 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 12.5v-9A1.5 1.5 0 0 1 5.5 2h5A1.5 1.5 0 0 1 12 3.5m-1.5-3a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3zM6.25 11a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="login-name" v-model="username" placeholder="请输入用户名" />
            </div>
            <div class="input-group">
              <label for="login-password"></label>
              <div class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="14" height="10" x="5" y="11" fill="#dcdcdc" rx="2"></rect><path fill="#dcdcdc" fill-rule="evenodd" d="M9.5 6.75a.25.25 0 0 0-.25.25v5h-1.5V7c0-.966.784-1.75 1.75-1.75h5c.966 0 1.75.784 1.75 1.75v5h-1.5V7a.25.25 0 0 0-.25-.25z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="password" id="login-password" v-model="password" placeholder="请输入密码" />
            </div>
          </div>
        </div>

        <!-- 记住密码勾选框 -->
        <div class="remember-me">
          <input type="checkbox" id="remember" v-model="remember" />
          <label for="remember" class="remember-label">记住密码</label>
          <span @click="openRegisterModal" class="register-link">注册</span>
        </div>

        <!-- 用户协议和须知 -->
        <div class="agreement-text">
          <div class="agreement-checkbox">
            <input type="checkbox" id="agree-login" v-model="isAgreed" />
            <span>
              点击同意<a href="/user-agreement" class="agreement-link">《用户使用协议》</a> 和
              <a href="/user-notice" class="agreement-link">《用户使用须知》</a>
            </span>
          </div>
        </div>

        <button type="submit" class="submit-btn">登录</button>

        <!-- 显示错误信息 -->
        <div v-if="error" class="error-message">
          <p>{{ error.message }}</p>
        </div>
      </form>
    </div>

    <!-- 注册弹窗 -->
    <div v-if="isRegisterModalOpen" class="modal-overlay register-modal" @click="closeRegisterModal">
      <div class="modal-content" @click.stop>
        <button class="close-icon" @click="closeRegisterModal">×</button>
        <h2>注册</h2>
        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <label for="register-username"></label>
            <div class="input-icon-register">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="#dcdcdc" fill-rule="evenodd" d="M12 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 12.5v-9A1.5 1.5 0 0 1 5.5 2h5A1.5 1.5 0 0 1 12 3.5m-1.5-3a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3zM6.25 11a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="register-username" v-model="registerUsername" placeholder="请输入用户名" />
          </div>
          <div class="input-group">
            <label for="register-password"></label>
            <div class="input-icon-register">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="14" height="10" x="5" y="11" fill="#dcdcdc" rx="2"></rect><path fill="#dcdcdc" fill-rule="evenodd" d="M9.5 6.75a.25.25 0 0 0-.25.25v5h-1.5V7c0-.966.784-1.75 1.75-1.75h5c.966 0 1.75.784 1.75 1.75v5h-1.5V7a.25.25 0 0 0-.25-.25z" clip-rule="evenodd"></path></svg>
            </div>
            <input
              type="password"
              id="register-password"
              v-model="registerPassword"
              @input="validatePassword"
              placeholder="请输入密码(8-12位)"
            />
            <div v-if="!passwordValid" class="password-error-hint">
              {{ passwordErrorMessage }}
            </div>
          </div>
          <div class="input-group">
            <label for="confirm-password"></label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              placeholder="请确认密码"
            />
          </div>


          <!-- 身份选择部分 -->
          <div class="role-selection">
            <h3>选择身份</h3>
            <button type="button" @click="selectRole('student')" class="role-btn" :class="{ selected: selectedRole === 'student' }">学生</button>
            <button type="button" @click="selectRole('teacher')" class="role-btn" :class="{ selected: selectedRole === 'teacher' }">教师</button>
          </div>

          <!-- 用户协议和须知 -->
          <div class="agreement-text-register">
            <div class="agreement-checkbox">
              <input type="checkbox" id="agree-register" v-model="isAgreed" />
              <span>
                点击同意<a href="/user-agreement" class="agreement-link">《用户使用协议》</a> 和
                <a href="/user-notice" class="agreement-link">《用户使用须知》</a>
              </span>
            </div>
          </div>

          <button type="submit" class="submit-btn">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
         passwordValid: true,
      passwordErrorMessage: '',
      username: '',
      password: '',
      remember: false,
      isAgreed: false,
      isRegisterModalOpen: false,
      registerUsername: '',
      registerPassword: '',
      confirmPassword: '',
      error: null,
      selectedRole: '',
    };
  },
  mounted() {
    this.checkRememberedUser();
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    validatePassword() {
      const len = this.registerPassword.length;
      if (len === 0) {
        this.passwordValid = true;
        this.passwordErrorMessage = '';
      } else if (len < 8) {
        this.passwordValid = false;
        this.passwordErrorMessage = '密码不能少于8位';
      } else if (len > 12) {
        this.passwordValid = false;
        this.passwordErrorMessage = '密码不能超过12位';
      } else {
        this.passwordValid = true;
        this.passwordErrorMessage = '';
      }
    },
    checkRememberedUser() {
      if (localStorage.getItem('remember')) {
        this.username = localStorage.getItem('username');
        this.password = localStorage.getItem('password');
        this.remember = true;
      }
    },
    openRegisterModal() {
      this.isRegisterModalOpen = true;
    },
    closeRegisterModal() {
      this.isRegisterModalOpen = false;
    },
    async handleLogin() {
      if (!this.isAgreed) {
        alert('请先同意用户协议和须知');
        return;
      }

      try {
        const res = await axios.post('https://sanrenxing.wihealth.com.cn/Login/login_by_phone/', {
          username: this.username,
          password: this.password,
        });

        if (res.status === 200 && res.data.message === '登录成功') {
          console.log("登录成功，收到的数据：", res.data); // 打印收到的数据

          // 假设后端返回的数据中包含 role 和 id
          const { role, id } = res.data;

          // 拼接 student_id
          const student_id = id.toString(); // 确保id为字符串类型
          // 打印拼接后的 student_id
          console.log("拼接后的 student_id:", student_id);

          // 打印保存到 localStorage 的内容
          console.log("保存到 localStorage 的 student_id:", localStorage.getItem('student_id'));
          localStorage.setItem('student_id', student_id); // 保存到本地缓存

          // 其他操作
          localStorage.setItem('role', role); // 保存用户角色
          localStorage.setItem('token', res.data.token); // 保存 token
          this.storeTokens(res.data);


          // 根据角色跳转到不同页面

          this.$router.push({ path: '/wenda' }) // 修改为跳转到首页
          console.log('登录成功，跳转到主页');
        } else {
          this.error = { message: '登录失败，请检查用户名和密码' };
        }
      } catch (err) {
        this.error = { message: '登录失败，请稍后再试' };
      }
    },
    storeTokens(data) {
      console.log('storeTokens 被调用，传入的 data:', data); // 打印传入的 data
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);

      console.log('token 已存入 localStorage:', localStorage.getItem('token')); // 检查 token 是否存入
      console.log('refreshToken 已存入 localStorage:', localStorage.getItem('refreshToken')); // 检查 refreshToken 是否存入

      if (this.remember) {
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        localStorage.setItem('remember', true);

        console.log('username 已存入 localStorage:', localStorage.getItem('username')); // 检查 username 是否存入
        console.log('password 已存入 localStorage:', localStorage.getItem('password')); // 检查 password 是否存入
        console.log('remember 已存入 localStorage:', localStorage.getItem('remember')); // 检查 remember 是否存入
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('remember');

        console.log('username 已从 localStorage 移除'); // 检查 username 是否移除
        console.log('password 已从 localStorage 移除'); // 检查 password 是否移除
        console.log('remember 已从 localStorage 移除'); // 检查 remember 是否移除
      }
    },
    selectRole(role) {
      this.selectedRole = role;
    },
    async handleRegister() {
  // 验证密码规则
  this.validatePassword();
  if (!this.passwordValid) return;

  // 表单验证
  if (!this.isAgreed) {
    alert('请先同意用户协议和须知');
    return;
  }
  if (!this.registerUsername || !this.registerPassword || !this.confirmPassword) {
    alert('请填写所有字段');
    return;
  }
  if (this.registerPassword !== this.confirmPassword) {
    alert('密码和确认密码不一致');
    return;
  }
  if (!this.selectedRole) {
    alert('请选择身份');
    return;
  }

  console.log('注册请求参数:', {
    username: this.registerUsername,
    password: this.registerPassword,
    role: this.selectedRole
  });

  try {
    // 1. 调用注册接口
    const registerRes = await axios.post('http://182.92.182.44:8001/Login/RegisterView/', {
      username: this.registerUsername,
      password: this.registerPassword,
      role: this.selectedRole,
    });

    console.log('注册响应数据:', registerRes.data);

    if (registerRes.status === 201) {
      const studentId = registerRes.data.user.id;
      console.log('获取到的学生ID:', studentId);

      // 调用第二个API同步信息
      const syncRes = await axios.post('http://api.xdrv.cn:52382/add-person/', {
        id: studentId
      });

      console.log('同步响应:', syncRes.data);

      if (syncRes.status === 201) {
        // 强制覆盖登录表单的值，无论原来是否有内容
        this.username = this.registerUsername;
        this.password = this.registerPassword;
        
        // 强制更新记住密码状态
        this.remember = true;
        localStorage.setItem('username', this.registerUsername);
        localStorage.setItem('password', this.registerPassword);
        localStorage.setItem('remember', 'true');
        
        // 清空注册表单
        this.registerUsername = '';
        this.registerPassword = '';
        this.confirmPassword = '';
        this.selectedRole = '';
        
        // 关闭注册弹窗
        this.closeRegisterModal();
        
        // 使用更友好的提示方式
        this.$message.success('注册成功！已自动填充登录信息');
      } else {
        throw new Error(syncRes.data.message || '信息同步失败');
      }
    } else {
      throw new Error(registerRes.data.message || '注册失败');
    }
  } catch (err) {
    console.error('发生错误:', err);
    
    if (err.response) {
      console.log('错误详情:', {
        status: err.response.status,
        data: err.response.data
      });
      alert(`操作失败: ${err.response.data.message || err.message}`);
    } else {
      alert(`操作失败: ${err.message}`);
    }
  }
}
  },
};
</script>

<style scoped>
/* 页面容器样式，用于居中登录表单 */
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器占满整个视口高度 */
  background-color: #f5f5f5; /* 添加背景色 */
}

/* 登录表单样式 */
.login-form {
  width: 800px; /* 增加宽度 */
  height: 550px;
  padding: 30px; /* 增加内边距 */
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.role-btn {
  padding: 10px 75px;
  background-color: #3E8BEE;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
.role-btn:hover {
  background-color: #0056b3; /* 修改为与登录按钮悬停样式一致 */
}

.role-btn.selected {
  background-color: #3E8BEE;
  border: 2px solid #003d80; /* 添加边框样式 */
  box-shadow: 0 0 10px rgba(0, 61, 128, 0.5); /* 添加阴影效果 */
}

/* 弹窗遮罩层样式 */
.modal-overlay {
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

/* 弹窗内容样式 */
.modal-content {
  background-color: #fff;
  padding: 30px; /* 增加内边距 */
  border-radius: 15px;
  width: 800px; /* 与登录表单宽度一致 */
  height: 600px; /* 与登录表单高度一致 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-content h2 {
  font-size: 18px;
  margin-bottom: 20px;
}
.password-error-hint {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 5px;
  position: relative;
  left: 200px;
}

/* 叉号按钮样式 */
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-icon:hover {
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  position: relative;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

.input-group input {
  width: 380px;
  padding: 10px 10px 10px 40px; /* 增加左内边距为图标留出空间 */
  border: 1px solid #ccc;
  border-radius: 14px;
  font-size: 16px;
  box-sizing: border-box;
  position: relative;
  right: -60px;
  top: -55px;
  margin-top: 20px;
}

.input-icon {
  position: absolute;
  left: 70px; /* 调整图标位置 */
  top: -15px;
  transform: translateY(-50%);
  width: 20px; /* 调整图标大小 */
  height: 20px;
  z-index: 1; /* 确保图标显示在输入框之上 */

}
.input-icon-register{
  position: absolute;
  left: 215px;
  top: 9px;
  z-index: 1; /* 调整图标垂直位置，避免被输入框遮挡 */
}

/* 记住密码勾选框样式 */
.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  bottom: 30px;
}

.remember-me input {
  margin-right: 5px;
  position:relative;
  bottom: -30px;
  left: 300px;
}

.remember-label {
  font-size: 14px;
  color: #666;
  position: relative;
  bottom: -30px;
  left: 300px;
}

.register-link {
  margin-left: auto;
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  position: relative;
  bottom: -30px;

}

.register-link:hover {
  color: #0056b3;
}

/* 提交按钮样式 */
.submit-btn {
  width: 380px;
  padding: 10px;
  background-color: #3E8BEE;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-size: 16px;
  position:relative;
  left: 330px;
  bottom: 28px;
}

.submit-btn:hover {
  background-color: #0056b3;
}

/* 用户协议文本样式 */
.agreement-text {
  font-size: 12px;
  color: #666;
  margin-top: -100px;
  text-align: center;
}

.agreement-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  position: relative;
  bottom: -170px;

}

.agreement-checkbox input {
  margin: 0;
}

.agreement-link {
  color: #5449E8;
  text-decoration: none;
}

.agreement-link:hover {
  text-decoration: underline;
}

/* 身份选择部分样式 */
.role-selection {
  margin-bottom: 15px;
  position: relative;
  top: 10px;
  left: 200px;
}

.role-btn {
  /* 未选择时的默认样式 - 灰色 */
  background-color: #dedbdb; /* 灰色背景 */
  color: #333; /* 深灰色文字 */
  border: 1px solid #aaa; /* 灰色边框 */
  padding: 8px 16px;
  margin: 0 25px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease; /* 添加过渡效果使变化更平滑 */
  width: 150px;
  position: relative;
  top: 15px;
}

.role-btn.selected {
  /* 被选择时的样式 - 蓝色 */
  background-color: #1890ff; /* 蓝色背景 */
  color: white; /* 白色文字 */
  border-color: #1890ff; /* 蓝色边框 */
}

.role-btn:hover {
  opacity: 0.8;
}


.role-selection h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

/* 二维码和输入框容器样式 */
.qrcode-and-inputs {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 二维码区域样式 */
.qrcode-area {
  width: 250px; /* 可根据需要调整宽度 */
  height: 250px; /* 可根据需要调整高度 */
  background-color: #ccc; /* 设置灰色背景 */
}

/* 输入框组容器样式 */
.input-group-container {
  flex: 1;
}

/* 注册弹窗新样式 */
.register-modal .modal-content {
  background-color: #f9f9f9;
}

.register-modal .input-group input {
  position: relative;
  left: 200px;
  top: -20px;
  background-color: #e9e9e9;
}

.register-modal .submit-btn {
  position: relative;
  left: 200px;
  bottom: -50px;
  background-color: #3E8BEE;
}

.register-modal .submit-btn:hover {
  background-color: #0056b3; /* 修改为与登录按钮悬停样式一致 */
}

/* 注册界面用户协议与须知样式 */
.agreement-text-register {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
  text-align: center;
  position: relative;
  bottom: 2px;
}
</style>
