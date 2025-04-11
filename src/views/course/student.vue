<template>
  <div>
    <div class="zhong" :class="{ 'hidden': isHidden }">
      <div class="zhong-content">
        <button class="new-dialog-btn" @click="addNewDialog">新建对话</button>
        <!-- <svg class="shoushuo" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="5.5"></circle>
            <path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"></path>
          </g>
        </svg> -->
<!-- 对话记录部分 -->
<div class="duihuaxuanze">
  <h3>历史对话</h3>
  <div class="dialog-list-container"> <!-- 新增滚动容器 -->
    <ul>
      <li class="dialog-text" 
    v-for="(dialog, index) in todayDialogs" 
    :key="index" 
    @click="handleDialogClick('today', index)" 
    :class="{ 'dianji': clickedDialogIndex.today === index }">
  {{ dialog }}
  <!-- 缩小后的三点菜单按钮 -->
  
    <div class="dots-menu" @click.stop="toggleMenu('today', index)">
      
      <svg class="sansvg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
        <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
      </svg>
    </div>
    <!-- 缩小后的下拉菜单 -->
    <div class="menu-dropdown" v-if="activeMenu === `today-${index}`" @click.stop>
      <button @click.stop="editDialog('today', index)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"/></svg>
        编辑
      </button>
      <button @click.stop="handleSettingClick('today', index)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.5 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/></svg>
        设置
      </button>
      <button @click.stop="deleteDialog('today', index)" class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
        删除
      </button>
    </div>
</li>
    </ul>
</div>
</div>
  
        <div class="sidebar-btn cang" @click="openCang" :class="{ 'hidden': isHidden }">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              data-swindex="0" d="m20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82M7 7h.01">
            </path>
          </svg>
          <span>收藏夹</span>
        </div>
      </div>
    </div>
    <!-- 收起按钮 -->
    <div class="toggle-btn" @click="toggleZhong" :class="{ 'hidden': isHidden, 'mirrored': isHidden,'move':isMove}">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="m8.369 12l4.747-8.968l1.768.936L10.632 12l4.252 8.032l-1.768.936z"></path></svg>
    </div>
  
     <transition name="fade">
    <div class="kcxz" v-if="!isHiddenup" :class="{ 'small-margin-left': isSmallMarginzuo, 'hiddenup': isHiddenup }">
      <!-- 添加课程属性选择索引 -->
      <div class="category-selector">
        <button @click="handleCategoryClick('all')" :class="{ 'active': selectedCategory === 'all' }">全部课程</button>
        <button @click="handleCategoryClick('science')" :class="{ 'active': selectedCategory === 'science' }">理学</button>
        <button @click="handleCategoryClick('engineering')" :class="{ 'active': selectedCategory === 'engineering' }">工学</button>
        <button @click="handleCategoryClick('literature')" :class="{ 'active': selectedCategory === 'literature' }">文学</button>
        <button @click="handleCategoryClick('law')" :class="{ 'active': selectedCategory === 'law' }">法学</button>
        <button @click="handleCategoryClick('philosophy')" :class="{ 'active': selectedCategory === 'philosophy' }">哲学</button>
        <button @click="handleCategoryClick('agriculture')" :class="{ 'active': selectedCategory === 'agriculture' }">农学</button>
        <button @click="handleCategoryClick('medicine')" :class="{ 'active': selectedCategory === 'medicine' }">医学</button>
        <button @click="handleCategoryClick('management')" :class="{ 'active': selectedCategory === 'management' }">管理学</button>
        <button @click="handleCategoryClick('history')" :class="{ 'active': selectedCategory === 'history' }">历史学</button>
        <button @click="handleCategoryClick('economics')" :class="{ 'active': selectedCategory === 'economics' }">经济学</button>
        <button @click="handleCategoryClick('education')" :class="{ 'active': selectedCategory === 'education' }">教育学</button>
        <button @click="handleCategoryClick('arts')" :class="{ 'active': selectedCategory === 'arts' }">艺术学</button>
      </div>

      <!-- 添加学校索引 -->
      <div class="university-selector">
        <button @click="handleUniversityClick('all')" :class="{ 'active': selectedUniversity === 'all' }">全部学校</button>
        <button @click="handleUniversityClick('cust')" :class="{ 'active': selectedUniversity === 'cust' }">长春理工大学</button>
        <button @click="handleUniversityClick('jlu')" :class="{ 'active': selectedUniversity === 'jlu' }">吉林大学</button>
        <button @click="handleUniversityClick('ccit')" :class="{ 'active': selectedUniversity === 'ccit' }">长春工业大学</button>
        <button @click="handleUniversityClick('nenu')" :class="{ 'active': selectedUniversity === 'nenu' }">东北师范大学</button>
        <button @click="handleUniversityClick('ccu')" :class="{ 'active': selectedUniversity === 'ccu' }">长春大学</button>
        <button @click="handleUniversityClick('hu')" :class="{ 'active': selectedUniversity === 'hu' }">汉口学院</button>
      </div>
<hr width="100%" size="2px" color="#d9d9d9">
      <!-- 添加8个白色的div，每个div内部有图片、课程名称和老师的名字 -->
      <div class="red-box-container" :class="{ 'four-per-row': !isSmallMarginzuo, 'three-per-row': isSmallMarginzuo }">
        <div class="red-box" v-for="(subject, index) in filteredSubjects" :key="index" @click="handleBoxClick(subject)">
          <div class="box-content">
            <!-- <div class="image-side">
              <img :src="getImageUrl(subject)" alt="Subject Image" class="subject-image" />
            </div> -->
            <div class="text-side">
              <div class="subject-name">{{ subject }}</div>
              <div class="teacher-name">{{ filteredTeachers[index] }}</div>
            </div>
          </div>
        </div>
        <div v-if="!hasFilteredSubjects" class="no-courses-message">
          请添加课程
        </div>
      </div>
      <!-- 添加搜索框和搜索按钮 -->
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="请输入内容...." class="search-box" />
        <div @click="performSearch" class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><circle cx="11" cy="11" r="5.5"></circle><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"></path></g></svg></div>
      </div>
    </div>
  </transition>
   
  <div class="chat-container" :class="{ 'moved': isMoved, 'small-margin-left': isMarginLeftSmall }">
  <!-- 聊天消息容器 -->
     <div class="course-dropdown">
  <div class="course-label-and-menu">
     <p class="kecheng" @click="toggleVisibility">当前课程：{{ selectedCourse || '未选择课程' }}
    <svg 
  class="rotate-180" 
  :class="{ 'rotated': isRotated }" 
  @click="toggleRotate"
  xmlns="http://www.w3.org/2000/svg" 
  width="30" 
  height="30" 
  viewBox="0 0 24 24"
>
  <path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/>
</svg>
    </p>
  </div>
     </div>
    
 <div class="chat-messages" ref="chatMessages"><!-- 遍历消息数组，渲染每条消息 -->
     <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
    <div class="message-actions" v-if="message.type === 'server'">
      <button @click="copyMessage(message.text)" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 696 692"><path fill="currentColor" d="m572 22l105 109c10 11 19 34 19 49v323c0 15-12 29-28 29H481v-49h157c5 0 9-4 9-9V202c0-5-4-9-9-9H522c-5 0-10-4-10-9V60c0-5-4-9-9-9H313c-5 0-10 4-10 9v69c-10-4-23-6-33-6h-15V30c0-16 13-28 28-28h242c15 0 37 9 47 20m-2 122h42c5 0 6-3 3-7l-48-49c-3-4-6-3-6 2v45c0 5 4 9 9 9m-252 38l104 110c11 11 19 33 19 48v323c0 16-12 29-27 29H29c-16 0-29-13-29-29V190c0-15 13-29 29-29h241c15 0 37 10 48 21M58 643h325c5 0 10-4 10-9V362c0-5-5-9-10-9H267c-5 0-9-4-9-9V220c0-5-4-9-9-9H58c-5 0-9 4-9 9v414c0 5 4 9 9 9m302-345l-47-51c-4-4-7-1-7 4v44c0 5 5 9 10 9h41c5 0 7-3 3-6">
      </path></svg></button>
      <button @click="favoriteMessage(message)" :class="{ 'redsvg': selectedButtons.includes('favorite') }"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="m12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01z">
      </path></svg></button>
      <button @click="likeMessage(message)" :class="{ 'redsvg': selectedButtons.includes('like') }"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88">
      </path></svg></button>
      <button @click="dislikeMessage(message)" :class="{ 'redsvg': selectedButtons.includes('dislike') }"><svg class="diaoc"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88">
      </path></svg></button>
      <button @click="shuaxin(message)" :class="{ 'redsvg': selectedButtons.includes('shuaxin') }"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m17.83 4.194l.42-1.377a1 1 0 1 1 1.913.585l-1.17 3.825a1 1 0 0 1-1.248.664l-3.825-1.17a1 1 0 1 1 .585-1.912l1.672.511A7.381 7.381 0 0 0 3.185 6.584l-.26.633a1 1 0 1 1-1.85-.758l.26-.633A9.381 9.381 0 0 1 17.83 4.194M2.308 14.807l-.327 1.311a1 1 0 1 1-1.94-.484l.967-3.88a1 1 0 0 1 1.265-.716l3.828.954a1 1 0 0 1-.484 1.941l-1.786-.445a7.384 7.384 0 0 0 13.216-1.792a1 1 0 1 1 1.906.608a9.381 9.381 0 0 1-5.38 5.831a9.386 9.386 0 0 1-11.265-3.328">

      </path></svg></button>
    </div><!-- 头像 -->
  <img :src="message.avatar" :alt="message.type" class="avatar" /> 
  <div class="message-content">
    {{ message.text }}
    <!-- <span v-if="message.file" class="file-name">{{ message.file }}</span>  显示文件名 -->
   </div>
   <span v-if="message.file" class="file-name">{{ message.file }}</span> <!-- 显示文件名 -->
      </div>
   
     </div><!-- 输入框容器 -->
 <div class="chat-input">
     <div class="input-container">
  <!-- 输入框 -->
  <input
  v-model="txt_question"
  @keyup.enter="ask_question"
  @input="adjustInputHeight"
  class="input"
  placeholder="我是你的课程助教，尽管提问吧"
/>
  <!-- 发送文件按钮 -->
  <label for="file-upload" class="send-file-btn">
    <input id="file-upload" type="file" @change="handleFileUpload" style="display: none;" />
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="m212.48 136.49l-82.06 82a60 60 0 0 1-84.85-84.88l98.16-97.89a40 40 0 0 1 56.56 56.59l-.17.16l-95.8 92.22a12 12 0 1 1-16.64-17.3l95.71-92.12a16 16 0 0 0-22.7-22.56l-98.16 97.86a36 36 0 0 0 50.93 50.91l82.06-82a12 12 0 0 1 17 17Z"></path></svg>
  </label>
  <!-- 发送按钮 -->
  <button @click="ask_question" class="send-btn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m0 176H48V48h160ZM90.34 125.66a8 8 0 0 1 0-11.32l32-32a8 8 0 0 1 11.32 0l32 32a8 8 0 0 1-11.32 11.32L136 107.31V168a8 8 0 0 1-16 0v-60.69l-18.34 18.35a8 8 0 0 1-11.32 0"></path></svg></button>
</div>
    </div>
   </div>
    <div class="notes-container" v-if="isVisible">
      <!-- 笔记列表 -->
      <div v-for="(note, index) in notes" :key="'note-'+index" class="note">
        <h3>
          {{ note.title }}
          <span class="delete-icon" @click="deleteNote(index)">×</span>
        </h3>
        <hr style="margin-top: -59px; margin-bottom: -5px; color: #cbcbcb;">
        <p>{{ note.content }}</p>
      </div>

      <!-- 收藏列表 -->
      <div v-for="favorite in favorites" :key="'fav-'+favorite.id" class="note">
  <h3>
    {{ favorite.title }}
   
  </h3>
  <span class="delete-icon" @click.stop="deleteFavorite(favorite.id)">×</span>
  <hr style="margin-top: -59px; margin-bottom: -5px; color: #cbcbcb;">
  <p>{{ favorite.content }}</p>
</div>

      <!-- 返回按钮 -->
      <div class="add-note-container" @click="addNote">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      count: 0,
      someValue: 'initial-value',
      favoriteId: null, // 初始值可以是 null 或其他默认值
      errorData:false,
      favorites: [], // 用于存储收藏夹数据
    isVisible: false, // 控制收藏夹是否显示
    isCollectionLoading: false, // 加载状态
    collectionError: null, // 错误信息
      selectedButtons: [], // 用于跟踪哪些按钮被选中
      isDialogSettingVisible: false,
      selectedButtons: [],
      allSubjects: [],
      courses: [],
      courseIds: [],
      loading: false,
      student_id: null,
      collections: [], // 专门存储收藏记录
    isCollectionLoading: false,
    collectionError: null,
      isRotated: false,
      activeMenu: null,
      qaPairs: [], // 存储从后端获取的问答对
      dialogQaMap: {}, // 存储对话与问答对的映射关系
      currentDialogId: null, // 当前选中的对话ID
      notes: [
     
    ],
    messages: [
        { text: '你好', type: 'server', avatar:require ('@/assets/logo.jpg') },
      ],
      // https://via.placeholder.com/40
      courses: [],       // 课程列表
    courseNames: [],   // 课程名称列表
    selectedCourse: '', // 当前选中的课程
    courseName: '',    // 显示的名称
      txt_question:'',
      isVisible: false,
      selectedButtons: [],
      newMessage: '',
      isHidden: false,
      isMoved: false,
      isMove: false,
      isMarginLeftSmall: false,
      isSmallMarginzuo: false,
      isHiddenup: true,
      searchQuery: '',
      currentSearchQuery: '',
      subjects: [''],
      teachers: [''],
      selectedCourse: '', // 当前选中的课程
      isDropdownOpen: false,
      selectedCategory: 'all', // 新增数据属性
      categories: {
        all: [''],
        science: [ ''],
        engineering: [''],
        literature: [''],
        law: [],
        philosophy: [],
        agriculture: [],
        medicine: [],
        management: [],
        history: [],
        economics: [],
        education: [],
        arts: []
      },
      selectedUniversity: 'all', // 新增数据属性
      universities: {
        all: [''],
        cust: [''],
        jlu: [],
        ccit: [],
        nenu: [],
        ccu: []
      },
      setting1: '',
      setting2: '',
      setting3: '',
      setting4: '',
      setting5: '',
      modelCategories: [],
      // 当前选中的对话框索引
      selectedDialogIndex: { today: null, weekly: null, monthly: null, earlier: null },
      dialogActionsVisible: { today: null, weekly: null, monthly: null, earlier: null },
      // 对话框数据
      todayDialogs: ['新建对话1', '新建对话2'],
      weeklyDialogs: ['新建对话3', '新建对话4'],
      monthlyDialogs: ['新建对话5', '新建对话6'],
      earlierDialogs: ['新建对话7', '新建对话8'],
      isDialogSettingVisible: false, // 控制编辑和多选功能的显示
      // 对话框设置面板显示状态
      dialogSettings: { today: {}, weekly: {}, monthly: {}, earlier: {} },
      selectedDialogs: { today: [], weekly: [], monthly: [], earlier: [] },
      uploadedFile: null, // 新增文件上传状态管理
      // 添加一个新的数据属性来存储被点击的对话框索引
      clickedDialogIndex: { today: null, weekly: null, monthly: null, earlier: null },
    };
  },
  async mounted() {
  console.log('组件已挂载，开始初始化');
  try {
    console.log('准备获取课程');
    await this.fetchCourses();
    console.log('课程获取完成');
    await this.getStudentId();
    console.log('学生ID获取完成');
    console.log('准备获取收藏夹数据');
    await this.fetchCollections();
    console.log('收藏夹数据获取完成');
    // 新增：调用获取聊天记录的方法
    await this.fetchChatRecords();
  } catch (error) {
    console.error('初始化失败:', error);
  }
},
  methods: {
   // 修改后的 deleteFavorite 方法
async deleteFavorite(favoriteId) {
  try {
    if (!confirm('确定要删除这条收藏吗？')) return;

    const token = localStorage.getItem('token');
    if (!token) throw new Error('未登录');

    const response = await fetch(`http://182.92.182.44:8001/Collect/collection/delete/${favoriteId}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // 处理 204 No Content
    if (response.status === 204) {
      // 从前端列表中删除
      this.favorites = this.favorites.filter(f => f.id !== favoriteId);
      // 更新 favoriteId
      this.favoriteId = this.favorites.length > 0 ? this.favorites[0].id : null;
      
      // 显示成功消息
      if (this.$toast) {
        this.$toast.success('删除成功');
      } else {
        console.log('删除成功');
      }
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error || data?.message || data?.detail || '删除失败'
      );
    }

    // 从前端列表中删除
    this.favorites = this.favorites.filter(f => f.id !== favoriteId);
    // 更新 favoriteId
    this.favoriteId = this.favorites.length > 0 ? this.favorites[0].id : null;
    
    // 显示成功消息
    if (this.$toast) {
      this.$toast.success('删除成功');
    } else {
      console.log('删除成功');
    }
  } catch (error) {
    console.error('删除失败:', error);

    // 检查 this.$toast 是否存在
    if (this.$toast) {
      this.$toast.error(`删除失败: ${error.message || '未知错误'}`);
    } else {
      console.error(`删除失败: ${error.message || '未知错误'}`);
    }
  }
},
handleSuccess(favoriteId) {
    this.favorites = this.favorites.filter(f => f.id !== favoriteId);
    this.favoriteId = this.favorites.length > 0 ? this.favorites[0].id : null;

    if (this.$toast) {
      this.$toast.success('删除成功');
    } else {
      console.log('删除成功');
    }
  },
  async fetchCollections() {
  this.isCollectionLoading = true;
  this.collectionError = null;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('未登录');
    }

    const response = await fetch('https://sanrenxing.wihealth.com.cn/Collect/collections/query/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }

    const data = await response.json();
    console.log('收藏夹数据:', data);

    // 将后端数据映射到 favorites 数组
    this.favorites = data.map(item => ({
      id: item.id,
      title: item.question, // question 映射到 title
      content: item.answer  // answer 映射到 content
    }));

    // 如果有收藏夹数据，将第一个收藏的 id 赋值给 favoriteId
    if (this.favorites.length > 0) {
      this.favoriteId = this.favorites[0].id;
    }
  } catch (error) {
    console.error('获取收藏夹失败:', error);
    this.collectionError = error.message;
  } finally {
    this.isCollectionLoading = false;
  }
},
    openCang(){
    this.isVisible = !this.isVisible;
    this.isDialogSettingVisible = !this.isDialogSettingVisible;
    this.fetchCollections();
  },
    toggleRotate() {
    this.isRotated = !this.isRotated;
  },
    toggleMenu(category, index) {
    const menuId = `${category}-${index}`;
    this.activeMenu = this.activeMenu === menuId ? null : menuId;
  },
  async favoriteMessage(message) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$message.error('请先登录');
      return;
    }

    // 找到对应的问题
    const questionIndex = this.messages.findIndex(msg => msg === message);
    const question = questionIndex > 0 && this.messages[questionIndex - 1].type === 'user'
      ? this.messages[questionIndex - 1].text
      : '相关问题';

    const apiEndpoint = 'https://sanrenxing.wihealth.com.cn/Collect/collections/';

    const requestBody = {
      question: question,
      answer: message.text,
      course_id: this.selectedCourseId || 1 // 使用实际课程ID如果可用
    };

    // 添加超时防止挂起
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `请求失败，状态码: ${response.status}`);
    }

    const data = await response.json();
    this.$message.success('收藏成功');
    this.toggleButton('favorite');

    // 如果收藏夹面板是打开的，刷新收藏数据
    if (this.isVisible) {
      await this.fetchCollections();
    }
  } catch (error) {
    console.error('收藏失败:', error);

    let errorMessage = '收藏失败';
    if (error.name === 'AbortError') {
      errorMessage = '请求超时，请检查网络连接';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = '网络错误，请检查网络连接';
    } else {
      errorMessage = error.message || errorMessage;
    }

    this.$message.error(errorMessage);
  }
},
  async fetchChatRecords() {
  const student_id = localStorage.getItem('student_id');
  try {
    const response = await fetch(`http://api.xdrv.cn:52382/question_and_a/?student_id=${student_id}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched chat records:', data);
    
    if (data.data && Array.isArray(data.data)) {
      this.qaPairs = data.data;
      
      // 将问答对转换为对话格式并保存ID
      this.todayDialogs = this.qaPairs.map(qa => {
        // 保存对话ID到映射关系
        this.dialogQaMap[qa.id] = qa;
        
        // 截取问题前20个字符作为对话标题
        const shortQuestion = qa.question.length > 20 
          ? qa.question.substring(0, 20) + '...' 
          : qa.question;
        return shortQuestion;
      });
      
      // 如果需要保留原有的"新建对话"，可以这样合并
      // this.todayDialogs = [...this.todayDialogs, ...qaDialogs];
    } else {
      console.error('Unexpected data format:', data);
    }
  } catch (error) {
    console.error('Failed to fetch chat records:', error);
  }
},
    copyMessage(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('消息已复制到剪贴板');
      }).catch(err => {
        console.error('无法复制文本: ', err);
      });
      this.toggleButton('copy');
    },
 
    likeMessage(message) {
      // 在这里添加点赞消息的逻辑
      console.log('点赞消息:', message);
      this.toggleButton('like'); // 切换 like 按钮的状态
    },
    dislikeMessage(message) {
      // 在这里添加点踩消息的逻辑
      console.log('点踩消息:', message);
      this.toggleButton('dislike'); // 切换 dislike 按钮的状态
    },
    shuaxin(message) {
      // 在这里添加刷新消息的逻辑
      console.log('刷新消息:', message);
      this.toggleButton('shuaxin'); // 切换 shuaxin 按钮的状态
    },
    toggleButton(button) {
      if (button === 'like' || button === 'dislike') {
        // 如果是 like 或 dislike，确保只有一个被选中
        this.selectedButtons = this.selectedButtons.filter(btn => btn !== 'like' && btn !== 'dislike');
      }
      if (this.selectedButtons.includes(button)) {
        this.selectedButtons = this.selectedButtons.filter(btn => btn !== button);
      } else {
        this.selectedButtons.push(button);
      }
    },
    // 消息框额外功能
    adjustInputHeight() {
    const input = document.querySelector('.input');
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
  },
    openCang(){
    this.isVisible = !this.isVisible;
    this.isDialogSettingVisible = !this.isDialogSettingVisible;
  },
  addNote(){
    this.isVisible = !this.isVisible;
  },
    deleteNote(index) {
    this.notes.splice(index, 1);
  },
    toggleZhong() {
      this.isHidden = !this.isHidden;
      this.isMarginLeftSmall = !this.isMarginLeftSmall;
      this.isSmallMarginzuo = !this.isSmallMarginzuo;
      this.articleModalSize = this.isHidden ? 'large' : 'small';
    },
    
    toggleVisibility() {
      if (this.isHiddenup) {
        this.isHiddenup = false;
        this.$nextTick(() => {
          this.isDropdownOpen = true;
        });
      } else {
        this.isDropdownOpen = false;
        setTimeout(() => {
          this.isHiddenup = true;
        }, 100); // 动画持续时间为300ms
      }
    },
    getImageUrl(subject) {// 根据科目名称返回对应的图片URL// 这里假设图片文件名与科目名称相同，并且图片位于 public/images 文件夹中
      return `/images/${subject}.png`;
    },
    saveSelectedCourse(course) {
    this.selectedCourse = course;
    localStorage.setItem('selectedCourse', course);
    this.courseName = course;
  },
  
  handleBoxClick(subject) {
    this.saveSelectedCourse(subject);
    this.isHiddenup = true;
  },
    performSearch() {
      this.currentSearchQuery = this.searchQuery;
    },
    confirmGenerate() {
      if (this.setting1.trim() === '' || this.setting2.trim() === '') return; // 如果课程名称或教师名称为空，不生成// 添加新的课程和教师到数组中
      this.subjects.push(this.setting1);
      this.teachers.push(this.setting2);// 更新搜索查询以显示新添加的课程
      this.currentSearchQuery = this.setting1; // 清空输入框
      this.setting1 = '';
      this.setting2 = ''; // 关闭设置弹窗
      this.closeSettingsModal();
    },
    handleCategoryClick(category) {
      this.selectedCategory = category;
    },
    editDialog(category, index) {
    this.activeMenu = null;
    console.log(`Edit dialog for ${category} at index ${index}`);
    // 编辑逻辑...
  },
  
  handleSettingClick(category, index) {
    this.activeMenu = null;
    console.log(`Setting clicked for ${category} dialog at index ${index}`);
    // 设置逻辑...
  },
  
  deleteDialog(category, index) {
  if (category === 'today' && index < this.qaPairs.length) {
    const recordId = this.qaPairs[index].id;
    
    // 发送删除请求到后端
    fetch(`http://api.xdrv.cn:52382/qna-records/${recordId}/delete/`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        // 从前端列表中删除
        this.todayDialogs.splice(index, 1);
        this.qaPairs.splice(index, 1);
      } else if (response.status === 404) {
        console.error('记录不存在');
      } else {
        console.error('删除记录时出错');
      }
    })
    .catch(error => {
      console.error('删除失败:', error);
    });
  }
},
  
  // 点击其他地方关闭菜单
  handleClickOutside(event) {
    if (!event.target.closest('.dots-menu')) {
      this.activeMenu = null;
    }
  },
    handleUniversityClick(university) {
      this.selectedUniversity = university;
    },
    handleDialogClick(category, index) {
      this.activeMenu = null;
  // 1. 更新选中状态
  this.resetAllSelections();
  this.selectedDialogIndex[category] = index;
  this.clickedDialogIndex[category] = index;

  // 2. 根据不同类型加载对话内容
  if (category === 'today') {
    this.loadTodayDialog(index);
  } else {
    this.loadOtherDialogs(category, index);
  }

  // 3. 滚动处理
  this.$nextTick(() => {
    this.scrollToSelectedDialog();
    this.scrollToBottom();
  });
},

// 辅助方法：重置所有选中状态
resetAllSelections() {
  this.selectedDialogIndex = { today: null, weekly: null, monthly: null, earlier: null };
  this.dialogSettings = { today: {}, weekly: {}, monthly: {}, earlier: {} };
  this.clickedDialogIndex = { today: null, weekly: null, monthly: null, earlier: null };
},

// 辅助方法：加载今日对话
loadTodayDialog(index) {
  if (index < this.qaPairs.length && this.qaPairs[index]) {
    const qaPair = this.qaPairs[index];
    
    // 保存当前对话ID
    this.currentDialogId = qaPair.id;
    
    this.messages = [
      {
        text: qaPair.question,
        type: 'user',
        avatar: require('@/assets/logo.jpg'),
        time: new Date().toLocaleString()
      },
      {
        text: qaPair.model_answer,
        type: 'server',
        avatar: require('@/assets/logo.jpg'),
        time: new Date().toLocaleString()
      }
    ];
    
    // 更新当前课程
    this.updateSelectedCourse(qaPair.subject);
  } else {
    this.messages = [
      {
        text: '这是一个新建的对话',
        type: 'server',
        avatar: require('@/assets/logo.jpg'),
        time: new Date().toLocaleString()
      }
    ];
    this.currentDialogId = null;
  }
},

// 辅助方法：加载其他分类对话
loadOtherDialogs(category, index) {
  this.messages = [
    {
      text: `这是${this.getCategoryName(category)}的第 ${index + 1} 个对话`,
      type: 'server',
      avatar: require('@/assets/logo.jpg'),
      time: new Date().toLocaleString()
    }
  ];
},

// 辅助方法：获取分类名称
getCategoryName(category) {
  const names = {
    weekly: '周分类',
    monthly: '月分类',
    earlier: '更早分类'
  };
  return names[category] || '';
},

// 辅助方法：更新选中课程
updateSelectedCourse(subject) {
  this.selectedCourse = subject || '未指定课程';
  localStorage.setItem('selectedCourse', this.selectedCourse);
},

// 辅助方法：滚动到选中的对话
scrollToSelectedDialog() {
  const container = document.querySelector('.dialog-list-container');
  const selectedItem = container?.querySelector('.dianji');
  if (selectedItem) {
    selectedItem.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
},

// 辅助方法：滚动到底部
scrollToBottom() {
  const chatMessages = this.$refs.chatMessages;
  if (chatMessages) {
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
  }
},
    handleSettingClick(category, index) {
      console.log(`Setting clicked for ${category} dialog at index ${index}`);
      // 切换显示状态
      this.dialogSettings[category][index] = !this.dialogSettings[category][index];
      this.isDialogSettingVisible = !this.isDialogSettingVisible;
    },
    // 添加删除对话的方法
    // 添加新的对话
    addNewDialog() {
      this.todayDialogs.unshift('新建对话'); // 将新对话添加到数组的开头
      this.isDialogSettingVisible = true; // 显示编辑和多选功能
    },
    editDialog(category, index) {
      console.log(`Edit dialog for ${category} at index ${index}`);
      // 在这里添加编辑对话的逻辑
    },
    toggleDialogActions(category, index) {
      if (this.dialogActionsVisible[category] === index) {
        this.dialogActionsVisible[category] = null;
      } else {
        this.dialogActionsVisible[category] = index;
      }
    },
    scrollToBottom() {
    const chatMessages = this.$refs.chatMessages;
    if (chatMessages) {
      // 使用平滑滚动
      chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
      });
    }
  },
    ask_question() {
  console.log('Selected Course:', this.selectedCourse);
  console.log('Question Text:', this.txt_question);
  console.log('Uploaded File:', this.uploadedFile);
  
  if (this.txt_question.trim() === '') {
    alert('输入不能为空');
    return;
  }
  if (!this.selectedCourse) {
    alert('请选择课程');
    return;
  }

  const selectedCourseCombined = this.courses.find(course => course.name === this.selectedCourse)?.subject;
  if (!selectedCourseCombined) {
    alert('未找到对应的课程信息，请重新选择课程');
    return;
  }
  console.log('Selected Course Combined:', selectedCourseCombined);

  const myDate = new Date();
  this.messages.push({
    time: myDate.toLocaleString(),
    text: this.txt_question,
    type: 'user',
    avatar: require('@/assets/logo.jpg') // 使用本地图片
  }, {
    time: myDate.toLocaleString(),
    text: '等待答案...',
    type: 'server',
    avatar: require('@/assets/logo.jpg') // 使用本地图片
  });
 // 滚动到底部
 this.$nextTick(() => {
      this.scrollToBottom();
    });
  const qu = this.txt_question;
  const formData = new FormData();
  formData.append('question', qu);
  formData.append('course_id', selectedCourseCombined);
  formData.append('model_name', "deepseek");

  // 打印 FormData 内容
  console.log('FormData Contents:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  fetch('http://api.xdrv.cn:52381/zhihuijiaoyu/text_files/', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      console.log('原始响应:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('解析后的数据:', data);
      if (!data.answer) {
        throw new Error('响应数据中缺少 answer 属性');
      }

      // 更新最后一条消息为答案
      this.messages[this.messages.length - 1].text = data.answer;

      const questionData = new FormData()
      questionData.append("student_id", this.student_id)
      questionData.append("question", qu)
      questionData.append("model_answer", data.answer)
      questionData.append("subject", this.selectedCourse)

      const formData1 = new FormData();
      formData1.append('answer', data.answer);
      formData1.append('course_name', this.selectedCourse);
      formData1.append('subject', selectedCourseCombined);

      // 打印第二个请求的 FormData 内容
      console.log('Second Request FormData:');
      for (let [key, value] of formData1.entries()) {
        console.log(key, value);
      }

      try {
        fetch('http://api.xdrv.cn:52381/zhihuijiaoyu/get_qa_file/', {
          method: 'POST',
          body: formData1
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`服务器响应错误: 状态码 ${response.status}`);
            }
            return response.json();
          })
          .then(data1 => {
            console.log('Fetched data:', data1);
            const formData2 = new FormData();
            formData2.append('liu', data1['daan']);
            formData2.append('course_name', this.selectedCourse);
            formData2.append('subject', selectedCourseCombined);
            formData2.append('student_id', this.student_id);
            
            // 打印第三个请求的 FormData 内容
            console.log('Third Request FormData:');
            for (let [key, value] of formData2.entries()) {
              console.log(key, value);
            }
            
            console.log('第三次请求发送的数据:', {formData2});
            fetch('http://api.xdrv.cn:52382/show_multiple_c/', {
              method: 'POST',
              body: formData2
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
              });
          });
      } catch (error) {
        console.error('Error in handleData:', error);
      }

      console.log('第二个请求发送的数据:', questionData);
      return fetch('http://api.xdrv.cn:52382/question_and_a/', {
        method: 'POST',
        body: questionData
      });
    })
    .then(response => {
      if (response) {
        console.log('第二个请求的原始响应:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }
    })
    .then(data => {
      if (data) {
        console.log('第二个请求解析后的数据:', data);
      }
    })
    .catch(error => {
      console.error('Error during requests:', error);
      this.messages[this.messages.length - 1].text = '获取答案失败，请重试。';
    })
    .finally(() => {
      console.log('请求完成');
    });

  this.txt_question = '';
},
    async getStudentId() {
      try {
        const student_id = localStorage.getItem('student_id');
        if (!student_id) {
          console.error("未找到 student_id，请先登录或完成相关操作");
          return;
        }
        this.student_id = student_id;
      } catch (error) {
        console.error("发生错误：", error);
      }
    },
    async fetchCourses() {
       if (this.courseNames.length > 0) {
      const cachedSelectedCourse = localStorage.getItem('selectedCourse');
      this.selectedCourse = cachedSelectedCourse || this.courseNames[0];
      this.courseName = this.selectedCourse;
       }
  console.log('获取课程方法被触发')
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('未找到有效的token');
    alert('请先登录');
    return;
  }
  if (this.loading) return;
  this.loading = true;

  try {
    const url = 'http://182.92.182.44:8001/Course_selection/student/courses/list/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log('后端返回的完整数据:', data);

    if (data && Array.isArray(data)) {
      // 初始化分类存储对象
      const categorizedCourses = {
        all: [],
        science: [],
        engineering: [],
        literature: [],
        law: [],
        philosophy: [],
        agriculture: [],
        medicine: [],
        management: [],
        history: [],
        economics: [],
        education: [],
        arts: []
      };
      
      // 初始化学校存储对象
      const universityCourses = {
        all: [],
        cust: [],
        jlu: [],
        ccit: [],
        nenu: [],
        ccu: []
      };

      // 处理每门课程
      this.courses = data.map(course => {
        const courseObj = {
          id: course.course_id,
          name: course.course_name,
          subject: course.course_id_name,
          teacher: course.teacher_name,
          school: course.school_name,
          college: course.college_name,
          category: course.course_category
        };
        
        // 添加到全部分类
        categorizedCourses.all.push(courseObj);
        
        // 根据课程分类添加到对应分类
        switch(course.course_category) {
          case '理学':
            categorizedCourses.science.push(courseObj);
            break;
          case '工学':
            categorizedCourses.engineering.push(courseObj);
            break;
          case '文学':
            categorizedCourses.literature.push(courseObj);
            break;
          case '法学':
            categorizedCourses.law.push(courseObj);
            break;
          case '哲学':
            categorizedCourses.philosophy.push(courseObj);
            break;
          case '农学':
            categorizedCourses.agriculture.push(courseObj);
            break;
          case '医学':
            categorizedCourses.medicine.push(courseObj);
            break;
          case '管理学':
            categorizedCourses.management.push(courseObj);
            break;
          case '历史学':
            categorizedCourses.history.push(courseObj);
            break;
          case '经济学':
            categorizedCourses.economics.push(courseObj);
            break;
          case '教育学':
            categorizedCourses.education.push(courseObj);
            break;
          case '艺术学':
            categorizedCourses.arts.push(courseObj);
            break;
        }
        
        // 根据学校添加到对应分类
        universityCourses.all.push(courseObj);
        if (course.school_name === '长春理工大学') {
          universityCourses.cust.push(courseObj);
        } else if (course.school_name === '吉林大学') {
          universityCourses.jlu.push(courseObj);
        } else if (course.school_name === '长春工业大学') {
          universityCourses.ccit.push(courseObj);
        } else if (course.school_name === '东北师范大学') {
          universityCourses.nenu.push(courseObj);
        } else if (course.school_name === '长春大学') {
          universityCourses.ccu.push(courseObj);
        }
        
        return courseObj;
      });

      // 更新分类数据
      this.categories = categorizedCourses;
      this.universities = universityCourses;
      
      // 提取课程名称和ID
      this.courseNames = this.courses.map(course => course.name);
      this.courseIds = this.courses.map(course => course.id);
      this.allSubjects = [...new Set(this.courses.map(course => course.subject))];

      if (this.courseNames.length > 0) {
        const cachedSelectedCourse = localStorage.getItem('selectedCourse');
        this.selectedCourse = cachedSelectedCourse || this.courseNames[0];
        console.log('课程获取成功:', this.courseNames);

        if (!localStorage.getItem('courseIds')) {
          localStorage.setItem('courseIds', JSON.stringify(this.courseIds));
        }
        if (!localStorage.getItem('courseNames')) {
          localStorage.setItem('courseNames', JSON.stringify(this.courseNames));
        }
        if (!localStorage.getItem('selectedCourse')) {
          localStorage.setItem('selectedCourse', this.selectedCourse);
        }
        if (!localStorage.getItem('allSubjects')) {
          localStorage.setItem('allSubjects', JSON.stringify(this.allSubjects));
        }
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
    closeDialogActions() {
      this.dialogActionsVisible.today = null;
      this.dialogActionsVisible.weekly = null;
      this.dialogActionsVisible.monthly = null;
      this.dialogActionsVisible.earlier = null;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFile = file; // 存储上传的文件
      }
    },
    handleClickOutside(event) {
      const dialogActions = document.querySelector('.dialog-settings');
      if (dialogActions && !dialogActions.contains(event.target)) {
        this.closeDialogActions();
      }
      // 检测点击是否发生在对话列表外
      const dialogSections = document.querySelectorAll('.duihuaxuanze');
      let isClickInsideDialog = false;
      dialogSections.forEach(section => {
        if (section.contains(event.target)) {
          isClickInsideDialog = true;
        }
      });
      if (!isClickInsideDialog) {
        this.closeDialogActions();
      }
    },
  
},
computed: {
  filteredSubjects() {
    // 获取当前选择的分类和学校的课程
    const categoryCourses = this.categories[this.selectedCategory] || [];
    const universityCourses = this.universities[this.selectedUniversity] || [];
    
    // 找出同时属于当前分类和当前学校的课程
    let filtered = categoryCourses.filter(course => 
      universityCourses.some(uniCourse => uniCourse.id === course.id)
    );
    
    // 如果有搜索词，进一步过滤
    if (this.currentSearchQuery) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(this.currentSearchQuery.toLowerCase())
      );
    }
    
    // 返回课程名称数组
    return filtered.map(course => course.name);
  },
 
  
  filteredTeachers() {
    // 获取当前选择的分类和学校的课程
    const categoryCourses = this.categories[this.selectedCategory] || [];
    const universityCourses = this.universities[this.selectedUniversity] || [];
    
    // 找出同时属于当前分类和当前学校的课程
    let filtered = categoryCourses.filter(course => 
      universityCourses.some(uniCourse => uniCourse.id === course.id)
    );
    
    // 如果有搜索词，进一步过滤
    if (this.currentSearchQuery) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(this.currentSearchQuery.toLowerCase())
      );
    }
    
    // 返回教师名称数组
    return filtered.map(course => course.teacher);
  },
  
  hasFilteredSubjects() {
    return this.filteredSubjects.length > 0;
  }
}
}
</script>

<style scoped>
.zhong {
   margin-left: 86px; /* 确保中间栏紧贴左侧栏   */
  width: 224px;/* 设置中间栏宽度为 300px */
  padding: 20px;
  background-color: #F0F0F0;
  position: fixed;
  left: 0px;
  top: 0;
  bottom: 0;
  z-index: 9;/* 确保中间栏在左侧栏下方 */
  transition: margin-left 0.3s ease;
 }
 .new-dialog-btn {
 background-color: #E6EDF8; /* 框内颜色 */
 color: #3366FF; /* 字体颜色 */
 border: 1px solid #3366FF; /* 外边框颜色 */
 padding: 5px 10px; /* 内边距 */
 border-radius: 15px; /* 圆角 */
 cursor: pointer; /* 鼠标指针样式 */
 font-size: 14px; /* 字体大小 */
 width: 165px;
 height: 50px;
 position: absolute;
 top: 30px;
 left: 19px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
 text-align: center; /* 文字居中 */
 line-height: 40px; /* 垂直居中 */
}.search-container-1 {
  display: flex;
  align-items: center;
}

.search-box-1{
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-right: 10px;
  margin-top: 20px;
}
.dialog-scroll-wrapper {
  max-height: 100%;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: #3366ff #f0f0f0;

}
.rotate-180 {
  transition: transform 0.3s ease; /* 平滑过渡效果 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

.rotate-180.rotated {
  transform: rotate(180deg);
}

 .new-dialog-btn:hover {
  background-color: #D9E5F3;/* 鼠标悬停时的框内颜色 */
 }
 .new-dialog-btn:hover {
  background-color: #D9E5F3;/* 鼠标悬停时的框内颜色 */
 }

 .zhong.hidden {
  margin-left: -300px; /* 隐藏中间栏 */
 }

 .toggle-btn {
  position: fixed;
  top: 50%;
  left: 310px;
  z-index: 0;/* 初始按钮位置 */
  cursor: pointer;
  height: 60px;
  width: 30px;
  padding: 5px;
  transition: left 0.3s ease, transform 0.3s ease;
  display: flex;/* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
 color: #D9D9D9;
 z-index: 10;
 }

 .toggle-btn.hidden {
  left: 84px; /* 按钮移动到左侧栏旁边 */
 }

 .toggle-btn.mirrored svg {
  transform: rotateY(180deg);/* 镜像图标 */
 }
 .zhong-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 }

 .rotate-180[data-v-1ef3ed61] {
    height: 30px;
    width: 30px;
    /* font-size: 116px; */
    position: absolute;
    left: 98%;
    top: -22%;
}
 .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中偏移 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index:0 ;
  width: 200px; /* 设置下拉菜单的宽度 */
 }

 .dropdown-menu button {
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  cursor: pointer;
  border: none;
  background-color: transparent;
 }
 .dropdown-menu button:hover {
  background-color: #f0f0f0;
 }

 .chat-container {
  display: flex;/* 使用 Flexbox 布局 */
  flex-direction: column;/* 垂直排列子元素 */
  height: 99vh;/* 高度占满整个视口 */
  background-color: #fafcfd;
  margin: 0 auto;/* 水平居中 */
  border-radius: 20px;/* 圆角 */
  overflow: hidden;/* 隐藏溢出内容 */
   margin-left: 224px;/* 为左侧栏留出空间   */
  margin-bottom: 0px;
  width: 85%;
  transition: margin-left 0.3s ease;
  transition: width 0.1s ease;
  position: relative;
 }

 .chat-container.small-margin-left {
  margin-left: 0px;
  width: 100%;
 }

 .course-dropdown {
  position: relative;
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  width: 100%;
}
 .dialog-list-container {
  min-width: 200px;
  height: 600px; /* 设置最大高度 */
  overflow-y: auto;  /* 启用垂直滚动 */
  margin-top: 10px;
  padding-right: 5px; /* 为滚动条留出空间 */

  /* 自定义滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 #f0f0f0;
}
/* 三点菜单样式 */
/* 三点菜单样式 */
.dots-menu {
  position: fixed;
  right: 10px;
  top: 10%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;
  z-index: 10; /* 添加z-index确保在最上层 */
}

.dots-menu:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
/* 下拉菜单样式 */
/* 下拉菜单样式 */
.menu-dropdown {
  width: 112%;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-dropdown button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: #333;
}

.menu-dropdown button:hover {
  background-color: #f5f5f5;
}

.menu-dropdown button svg {
  margin-right: 8px;
}

.menu-dropdown .delete-btn {
  color: #ff4d4f;
}
.dialog-list-container::-webkit-scrollbar {
  width: 6px;
}

.dialog-list-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

.dialog-list-container::-webkit-scrollbar-thumb {
  background-color: #3366ff;
  border-radius: 3px;
}

.dialog-list-container ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.dialog-text {
  padding: 8px 25px 8px 12px; /* 右侧留出空间 */
  margin: 4px 0;
  border-radius: 4px;
width: 100%;
  padding-right: 24px; /* 缩小留白 */
  font-size: 20px; /* 可选：缩小字体 */
}
.dialog-text:hover .setting-btn {
  display: inline-block; /* 确保悬停时显示 */
}
.dialog-text:hover {
  background-color: #e6e6e6;
}
.duihuaxuanze {
  padding: 10px 15px;
  /* position: relative; */
  height: calc(100% - 180px); /* 调整高度适应布局 */
  margin-top: 80px;
  overflow: hidden; /* 新增 */
}

.duihuaxuanze h3 {
  margin: 0 0 15px 0;
  padding: 0 10px;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: inline-block; /* 确保宽度限制生效 */
}

.setting-btn {
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  z-index: 1; /* 确保按钮在最上层 */
  background: rgba(255,255,255,0.8); /* 添加背景确保可见 */
  padding: 0 5px;
  border-radius: 3px;
}

.dialog-settings {
  position: absolute;
  left: 100%; /* 改为100%而不是187% */
  top: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100; /* 提高z-index确保在最上层 */
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 120px; /* 确保足够宽度 */
}

.dialog-text.dianji {
  background-color: #d9d9d9;
  color: #3366ff;
  position: relative;
}

 .course-label-and-menu {
  display: flex;
  justify-content: center; /* 子元素水平居中 */
  align-items: center; /* 子元素垂直居中 */
  flex-direction: column; /* 垂直排列子元素 */
 }

 .kecheng {
  cursor: pointer;
  margin: 0;
  font-size: 18px;
  text-align: center;
  color: #00000063;
  position: relative;
  top: 5px;
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%; /* 确保宽度足够 */
}

 .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中偏移 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 0;
  width: 200px; /* 设置下拉菜单的宽度 */
 }
 .dropdown-menu button {
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  cursor: pointer;
  border: none;
  background-color: transparent;
 }
 .dropdown-menu button:hover {
  background-color: #f0f0f0;
 }
 .diaoc{
  rotate: 180deg;
 }
 .chat-messages[data-v-1ef3ed61] {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #fafcfd;
    position: relative;
    top: 15px;
}
 .chat-messages .redsvg{
color: red;
 }
 .message {
  margin: 5px 201px;/* 上下外边距 */
  padding: 10px;/* 内边距 */
  border-radius: 8px;/* 圆角 */
  max-width: 70%;/* 最大宽度 */
  display: flex;/* 使用 Flexbox 布局 */
  align-items: flex-start;/* 子元素垂直对齐方式 */
  position: relative;
 }

 .message.user {
  align-self: flex-end;/* 自身对齐方式为右侧 */
  flex-direction: row-reverse;/* 子元素反向排列 */
  margin-right: 0;/* 右侧外边距为 0 */
  position: relative;
 }

 .message.server {
  align-self: flex-start;/* 自身对齐方式为左侧 */
  flex-direction: row;/* 子元素正常排列 */
 }

 .avatar {
  width: 40px;/* 宽度 */
  height: 40px;/* 高度 */
  border-radius: 50%;/* 圆形 */
  margin-right: 10px;/* 右侧外边距 */
 }

 .message.user .avatar {
  margin-left: 10px;/* 左侧外边距 */
  margin-right: 0px;/* 右侧外边距为 0 */
 }

 .message-content {
  background-color: #d1f5d3;
  border-radius: 12px;
  color: rgba(60, 131, 212, 0.943);
  padding: 9px 16px;
  width: fit-content;
  min-width: 0px;
  max-width: 450px;
  /* 添加以下样式实现自动换行 */
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin-bottom: 10px;
}
.message.user .message-content {
  background-color: #36f;
  color: #fff;
  /* 同样添加自动换行样式 */
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
 /* 消息框功能 */
 .message-actions {
   position: absolute;
  top: 98%;
  left: 6.5%;
}

.message-actions button {
  margin-right: 0px;
    padding: 5px 6px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: none;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
}

.message-actions button:hover {
  background-color: #d0d0d0;
}
 .message.user .message-content {
  background-color: #36f;
  color: #fff;/* 背景颜色 */
  align-self: flex-end;/* 自身对齐方式为右侧 */
 }

 .message.server .message-content {
  background-color: #ffffff;/* 背景颜色 */
  align-self: flex-start;/* 自身对齐方式为左侧 */
 }

 .chat-input {
  display: flex;/* 使用 Flexbox 布局 */
  justify-content: center;/* 水平居中 */
  padding: 10px;/* 内边距 */
  background-color: #fafcfd;/* 背景颜色 */
 }

 .input-container {
  position: relative; /* 相对定位 */
  width: 700px;/* 宽度 */
  height: 66px;/* 高度 */
  box-shadow: 0 8px 18px rgba(12, 12, 12, 0.1);/* 阴影 */
  border-radius: 35px;/* 圆角 */
  overflow: hidden; /* 隐藏溢出内容 */
  display: flex;/* 使用 Flexbox 布局 */
  align-items: center;/* 子元素垂直对齐方式 */
 }

 .input {
  flex: 1;
  padding: 10px 100px 10px 33px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  /* 添加以下样式实现自动换行 */
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  min-height: 66px; /* 确保输入框有足够高度 */
  resize: none; /* 防止用户手动调整大小 */
}

 .send-btn {
 position: absolute;
 right: 10px;
 top: 50%;
 transform: translateY(-50%);
 border: none;
 background-color: transparent;
 font-size: 16px;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 width: 49px;
 height: 34px;
 border-radius: 42%;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 transition: all 0.3s ease;
}
.send-file-btn {
 position: absolute;
 top: 30%;
 left: 86%;

}
 .shoushuo {
 position: absolute;
 left: 201px;
 top: 44px;
 background-color: #D9D9D9; /* 圆圈背景颜色 */
 border-radius: 50%; /* 圆角 */
 width: 25px;
 height: 25px;
 display: flex;
 align-items: center;
 justify-content: center;
}

 .cang {
 position: fixed;
  top: 94%;
  left: 7%;
  width: 10%;
  height: 4%;
  background-color: #f0f0f0f0;
  -webkit-box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  transition: margin-left 0.3s ease;
}

 .cang:hover{
  background-color: #ffffff;
 }
 .cang.hidden {
  margin-left: -300px; /* 隐藏收藏夹 */
 }
 .sidebar-btn.cang {
  flex-direction: row; /* 改为水平排列 */
  align-items: center; /* 垂直居中对齐 */
 }

 .sidebar-btn.cang svg {
  margin-right: 5px; /* 图标和文字之间的间距 */
  transform: rotate(90deg);
 }
 .sidebar-btn.cang .icon {
 width: 20px;
 height: 20px;
 fill: #999; /* 浅灰色 */
 filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)); /* 浅立体效果 */
}

.category-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.category-selector button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: none;
  transition: background-color 0.3s;

}

.category-selector button.active {
  background-color: #F1FAFF;
  color: #3366ff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.university-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  left: -12%;
}
.university-selector button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  /* background-color: #f0f0f0; */
  cursor: pointer;
  background: none;
  transition: background-color 0.3s;
}
.university-selector button.active {
  background-color: #F1FAFF;
  color: #3366ff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.kcxz {
  position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 93vh;
    background-color: #fafcfd;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    margin-left: 242px;
    margin-top: 56px;
    margin-bottom: 0px;
    width: 1316px;
    transition: margin-left 0.3s ease, width 0.1s ease, transform 0.3s ease, opacity 0.3s ease, -webkit-transform 0.3s ease;
    z-index: 8;
}

.kcxz.small-margin-left {
 margin-left: 0px;
 width: 1520px;
}

.kcxz.hiddenup {
 transform: translateY(-100%);
 opacity: 0;
}

/* 修改后的课程容器样式 */
.red-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 60px;
  scrollbar-width: thin;
  scrollbar-color: #3366ff #f0f0f0;
}

/* 自定义滚动条样式 */
.red-box-container::-webkit-scrollbar {
  width: 8px;
}

.red-box-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.red-box-container::-webkit-scrollbar-thumb {
  background-color: #3366ff;
  border-radius: 4px;
}

.red-box {
  width: 280px;
  height: 140px;
  margin: 15px;
  position: relative;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
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
  justify-content: flex-start;
}

.image-side {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subject-image {
  max-width: 100%;
  max-height: 100%;
}

.text-side[data-v-1ef3ed61] {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
    text-align: left; /* 内部文本保持左对齐 */
    margin: 0 auto; /* 水平居中（如果父容器是flex可能需要删除） */
}

.subject-name {
  font-size: 24px;
  color: black;
}

.teacher-name {
  font-size: 16px;
  color: gray;
  margin-top: 5px;
}

/* 修改后的搜索框样式 */
.search-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  z-index: 10;
  background-color: #fafcfd;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
}

.search-box {
  width: 42%;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  position: relative;
  left: 265px;
  bottom: 0px;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.1);
}

.small-margin-left .search-box {
  position: relative;
  left: 305px;
  bottom: -211px;
}

.small-margin-left .search-button {
  position: relative;
  bottom: -711%;
  left: 18%;
}

.search-button {
  width: 4%;
  height: 25px;
  position: fixed;
  bottom: 27%;
  left: 59%;
}

.duihuaxuanze span {
  position: absolute;
  left: 165%;
  top: -20%;
}
.add-note-container {
  cursor:pointer;
    font-size: 30px;
    right: 2%;
    position: fixed;
}

.dianji {
  background-color: #D9D9D9;
  color: #3366ff;
}

.zhong-content h3 {
  position: relative;
  left: 32%;
}

.zhong-content ul {
  list-style-type: none;
}

.dialog-settings {
  width: 112%;
  position: absolute;
  left: 187%;
  top: -244%;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.dialog-item {
  cursor: pointer;
  padding: 10px 15px;
  margin: 6px 0;
  border-radius: 8px;
  transition: all 0.25s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #eee;


}
.settings-toggle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;


}

/* ===== 新增的加载更多按钮 ===== */
.load-more {
  text-align: center;
  padding: 10px;
  color: #3366ff;
  cursor: pointer;
  font-size: 13px;
  margin-top: 10px;
  border-radius: 4px;


}

/* ===== 响应式调整 ===== */
@media (max-width: 768px) {
  .duihuaxuanze {
    height: calc(100% - 160px);
    margin-top: 60px;
  }

  .dialog-item {
    padding: 8px 12px;
    font-size: 13px;
  }
}
.dialog-content {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.dialog-settings svg {
  position: relative;
  top: 3px;
  left: -1px;
  margin-top: 0px;
  margin-left: 0px;
}

.dialog-settings button {
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  border-radius: 0;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s, color 0.3s;
}
/* 三点菜单容器 */
.dots-menu-container {
  /* position: relative; */
  display: inline-block;
  height: 18px; /* 缩小高度 */
}

/* 三点菜单按钮 */
.dots-menu {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 2px; /* 缩小内边距 */
  border-radius: 50%;
  transition: background-color 0.2s;
  z-index: 1;
  width: 18px; /* 固定宽度 */
  height: 18px; /* 固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 下拉菜单 */
.menu-dropdown[data-v-1ef3ed61] {
     position: absolute;
    left: 50%;
    top: -34%;
    /* z-index: 1000; */
    background: white;
    /* border: 1px solid #ddd; */
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    min-width: 90px;
    font-size: 12px;
}

/* 菜单项 */
.menu-dropdown button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 8px; /* 缩小内边距 */
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 12px; /* 缩小字体 */
}

.menu-dropdown button svg {
  margin-right: 6px; /* 缩小图标间距 */
  width: 12px; /* 固定图标大小 */
  height: 12px;
}

/* 对话框文本调整 */

.dialog-settings button:hover {
  background-color: #E6EDF8;
}

.dialog-settings button:last-child {
  color: #ff0000;
}

.file-name {
  margin-top: 5px;
  color: #555;
  position: absolute;
  left: 63%;
  top: -19%;
}

/* 收藏夹样式 */
.notes-container {
  overflow-y: auto; /* 启用垂直滚动 */
  max-height: 100vh; /* 最大高度为视口高度 */
  scrollbar-width: thin; /* 滚动条宽度 */

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  position: fixed;
  height: 9490px;
  background-color: #fafcfd;
  margin: 0 auto;
  border-radius: 20px;
  padding-top: 0;
  left: 19%;
  top: 0%;
  width: 1500px;
  z-index: 100;
}

.note {
  background-color: #f5f5f5;
  width: 320px;
  margin-top: 30px;
  margin-left: 90px;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  cursor: pointer;
  max-height: 270px;
}

.note h3 {

  padding-bottom: 35px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 1);
  white-space: nowrap;      /* 禁止换行 */
  overflow: hidden;         /* 隐藏溢出内容 */
  text-overflow: ellipsis;  /* 显示省略号 */
  max-width: 150%;          /* 确保宽度限制 */
  display: inline-block;    /* 使宽度限制生效 */
  width: calc(23ch + 10px); /* 10个中文字符宽度 + 边距 */
}

.note p {
  font-family: 'NSimSun', serif;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.65);
  max-height: 160px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;    /* 限制显示7行（约210字，假设每行30字） */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.delete-icon {
  font-size: 35px;
  cursor: pointer;
  color: #000;
  margin-left: 30px;
  position: relative;
  top: -50px;

  font-weight: 1;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .red-box {
    width: 240px;
    height: 120px;
  }

  .subject-name {
    font-size: 20px;
  }

  .teacher-name {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .red-box-container {
    justify-content: center;
  }

  .red-box {
    width: 45%;
    margin: 10px 2.5%;
  }

  .search-box {
    width: 70%;
    left: 15%;
  }

  .university-selector {
    left: 0;
  }
}
</style>

