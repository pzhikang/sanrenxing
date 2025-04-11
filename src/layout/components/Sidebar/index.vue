<template>
  <div>
    <!-- 侧边栏容器 -->
    <div :class="{'has-logo':showLogo}" class="sidebar-container">
      <logo v-if="showLogo" :collapse="isCollapse" />
      
      <div class="sidebar-scroll-container">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :unique-opened="false"
            :active-text-color="variables.menuActiveText"
            :collapse-transition="false"
            mode="vertical"
            class="sidebar-menu"
          >
            <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
          </el-menu>
        </el-scrollbar>
      </div>

      <!-- 个人中心按钮 -->
      <div class="fixed-button">
        <div class="button-container" ref="buttonContainer">
          <el-button 
            type="primary" 
            @click="toggleUserMenu"
            class="icon-button"
            circle
          >
            <i class="el-icon-user"></i>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 独立于侧边栏的全局用户菜单 -->
    <transition name="el-zoom-in-top">
      <div 
        v-show="showUserMenu" 
        class="global-user-menu"
        :style="menuPosition"
        ref="userMenu"
      >
        <div class="menu-item" @click="goToSettings">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </div>
        <div class="menu-item" @click="logout">
          <i class="el-icon-switch-button"></i>
          <span>退出登录</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      showUserMenu: false,
      buttonPosition: { left: 0, top: 0 },
      menuWidth: 150,
      menuHeight: 88
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return false
    },
    menuPosition() {
      // 计算菜单的最终位置，确保不会超出页面
      let left = this.buttonPosition.left
      let top = this.buttonPosition.top
      
      // 检查右侧是否超出
      const windowWidth = window.innerWidth
      if (left + this.menuWidth > windowWidth) {
        left = windowWidth - this.menuWidth - 10 // 留出10px边距
      }
      
      // 检查底部是否超出
      const windowHeight = window.innerHeight
      if (top + this.menuHeight > windowHeight) {
        top = windowHeight - this.menuHeight - 10 // 留出10px边距
      }
      
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${this.menuWidth}px`
      }
    }
  },
  methods: {
    toggleUserMenu(e) {
      // 获取按钮容器位置
      const buttonContainer = this.$refs.buttonContainer
      const rect = buttonContainer.getBoundingClientRect()
      
      // 计算初始位置（按钮右侧10px处）
      this.buttonPosition = {
        left: rect.right + 10,
        top: rect.top - 15,
      }
      
      this.showUserMenu = !this.showUserMenu
      
      // 在下次DOM更新后检查菜单是否超出边界
      if (this.showUserMenu) {
        this.$nextTick(() => {
          const menu = this.$refs.userMenu
          if (menu) {
            const menuRect = menu.getBoundingClientRect()
            this.menuWidth = menuRect.width
            this.menuHeight = menuRect.height
          }
        })
      }
    },
    goToSettings() {
  this.showUserMenu = false;
  const role = localStorage.getItem('role');
  if (role === 'student') {
    this.$router.push('/Studentgrzx/student-grzx');
  } else {
    this.$router.push('/Teachergrzx/teacher-grzx');
  }
},
    logout() {
      this.showUserMenu = false
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login/index')
      })
    },
    handleClickOutside(e) {
      const userMenu = this.$refs.userMenu
      if (!this.$el.contains(e.target) && 
          (!userMenu || !userMenu.contains(e.target))) {
        this.showUserMenu = false
      }
    },
    handleResize() {
      if (this.showUserMenu) {
        this.showUserMenu = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
}

.sidebar-scroll-container {
  flex: 1;
  overflow: hidden;
}

.sidebar-menu {
  width: 100% !important;
  height: 100%;
  background-color: #bdcad8;
}

.fixed-button {
  position: sticky;
  bottom: 20px;
  left: 20px;
  z-index: 1002;
  text-align: center;
  padding: 0;
  margin-top: auto;
}

.fixed-button .el-button {
  color: black;
  border-color: white;
  background-color: white;
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-container {
  position: relative;
  display: inline-block;
}

/* 全局用户菜单样式 */
.global-user-menu {
  position: fixed;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;

  max-width: 100vw;
  box-sizing: border-box;
}

.menu-item {
  padding: 10px 15px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  white-space: nowrap;
}

.menu-item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

.menu-item i {
  margin-right: 10px;
  font-size: 16px;
}
</style>