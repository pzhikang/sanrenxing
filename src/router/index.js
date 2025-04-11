import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 静态路由
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/wenda',
    component: Layout,
    redirect: (to) => {
      const role = localStorage.getItem('role');
      return role === 'student' ? '/student' : '/dashboard';
    },
    meta: {
      icon: require('@/assets/logo.jpg'), // 替换为图片路径
      affix: false
    }
  },

  // 教师首页（独立路由）
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: '', icon: 'dashboard' },
    role: ['teacher', 'admin'],
    children: [{
      path: '',
      component: () => import('@/views/course/index'),
    }]
  },

  // 学生首页（独立路由）
  {
    path: '/student',
    component: Layout,
    meta: { title: '', icon: 'dashboard' },
    role: ['student', 'admin','teacher'],
    children: [
      {
        path: '',
        component: () => import('@/views/course/student'),
      }
    ]
  },

  {
    // 教师
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
      }
    ],
    role: ['teacher', 'admin']
  },


  {
    // 教师
    path: '/ask',
    component: Layout,
    children: [

      {
        path: 'select',
        name: 'SelectQuestions',
        component: () => import('@/views/course/index'),
        meta: { title: '助教设置', icon: require('@/assets/zjsz.jpg') }
      },

    ],
    role: ['teacher', 'admin']
  },


  {
    // 教师
    path: '/bianji',
    component: Layout,
    children: [
      {
        path: 'bianji',
        name: 'Form',
        component: () => import('@/views/form/bianji'),
      }
    ],
    role: ['teacher', 'admin']
  },

  {
    // 教师
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'teacher',
        name: 'course',
        component: () => import('@/views/course/teacher'),

      }
    ],
    role: ['teacher', 'admin']
  },



  {
    // 教师
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
      },
    ],
    role: ['teacher', 'admin']
  },
  {
    // 教师
    path: '/example',
    component: Layout,
    children: [
      {
        path: 'picture',
        name: 'picture',
        component: () => import('@/views/picture/index'),
        meta: { title: '学情分析', icon: require('@/assets/xqfx.jpg') }
      },
    ],
    role: ['teacher', 'admin']
  },
  {
    // 教师
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'upload',
        name: 'UploadQuestions',
        component: () => import('@/views/custom-question-bank/upload'),
      },

    ],
    role: ['teacher', 'admin']
  },
  {
    // 教师
    path: '/teacher-question',
    component: Layout,
    children: [

      {
        path: 'question',
        name: 'SelectQuestions',
        component: () => import('@/views/teacher-question/question'),
        meta: { title: '智能问答', icon: require('@/assets/znwd.jpg') }
      },

    ],
    role: ['teacher','admin']
  },
  {
    // 教师
    path: '/student-question',
    component: Layout,
    children: [

      {
        path: 'question',
        name: 'SelectQuestions',
        component: () => import('@/views/course/student'),
        meta: { title: '智能问答', icon: require('@/assets/znwd.jpg') }
      },

    ],
    role: ['student','admin']
  },
  {
    // 教师
    path: '/teacher-question',
    component: Layout,
    children: [

      {
        path: 'select',
        name: 'TeacherQuestions',
        component: () => import('@/views/custom-question-bank/select'),
        meta: { title: '定制题库', icon: require('@/assets/dztk.jpg') }
      },

    ],
    role: ['teacher', 'admin']
  },
  {
    // 教师
    path: '/saved',
    component: Layout,
    children: [

      {
        path: 'saved',
        name: 'SavedQuestionBank',
        component: () => import('@/views/custom-question-bank/saved'),
      }
    ],
    role: ['teacher', 'admin']
  },
  {
    path: '/Teachergrzx',
    component: Layout,
    role: [ 'teacher', 'admin' ],
    meta: { title: '个人中心', icon: 'el-icon-user' },
    children: [
      {
        path: 'teacher-grzx',
        name: 'TeacherPersonalCenter',
        component: () => import('@/views/grzx/teacher'), // 指向你的个人中心组件
      }
    ]
  },

  // 学生功能模块
  {
    path: '/evaluation',
    component: Layout,
    role: ['student', 'admin'],
    children: [
      {
        path: 'evaluation',
        name: 'personalEvaluation',
        component: () => import('@/views/course/evaluation'),
        meta: { title: '个性习题', icon: require('@/assets/gxxt.jpg') }
      },

    ]
  },
  {
    path: '/analyze',
    component: Layout,
    role: ['student', 'admin'],
    children: [

      {
        path: 'analyze',
        name: 'analyze',
        component: () => import('@/views/analyze/index'),
        meta: { title: '文章解析', icon: require('@/assets/wzjx.jpg') },
        bottom: true
      }
    ]
  },
  {
    path: '/Studentgrzx',
    component: Layout,
    role: [ 'student', 'admin' ],
    meta: { title: '个人中心', icon: 'el-icon-user' },
    children: [
      {
        path: 'student-grzx',
        name: 'StudentPersonalCenter',
        component: () => import('@/views/grzx/student'), // 指向你的个人中心组件
      }
    ]
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
