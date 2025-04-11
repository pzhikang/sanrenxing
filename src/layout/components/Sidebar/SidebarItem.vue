<template>
  <div
    v-if="!item.hidden && (item.role === undefined || item.role.includes(role))"
    :class="{ 'bottom-menu': item.bottom }"
  >
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          class="auto-height-item"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
            :icon-size="iconSize"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
      class="auto-height-submenu"
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
          :icon-size="iconSize"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
        :icon-size="iconSize"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 18
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      role: localStorage.getItem('role')
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  order: 1;
}

/* 高度自适应菜单项 */
.auto-height-item,
.auto-height-submenu .el-submenu__title {
  height: auto !important;
  min-height: var(--menu-item-height, 56px);
  padding: 8px 0px !important;
  display: flex;
  align-items: center;
  line-height: 1.4;
}

/* 嵌套菜单样式 */
.nest-menu .auto-height-item {
  padding-left: 40px !important;
}
</style>