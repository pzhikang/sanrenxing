<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import AnalyzeIndex from '@/views/analyze/index.vue';
import CourseIndex from '@/views/course/index.vue';
export default {
  name: 'App',
  components: {
    CourseIndex,
    AnalyzeIndex
  }
}
</script>