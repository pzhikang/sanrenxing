<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <img v-else-if="isImage" :src="iconClass" :class="className" class="svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    isImage() {
      // 判断是否为图片路径（支持 png、jpg、jpeg、gif）
      return /\.(png|jpg|jpeg|gif)$/.test(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 24px;
  height: 24px;
}

.svg-icon svg {
  width: 100%;
  height: 100%;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}

img.svg-icon {

  border-radius: 12px;
  margin-top: 40px;
    margin-bottom: 18px;
    width: 40px;
    height: 40px;
  object-fit: contain; /* 保持图片比例 */
}
</style>