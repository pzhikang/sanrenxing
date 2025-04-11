<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      if (icon.includes('el-icon')) {
        // Element UI 图标（保持可点击）
        vnodes.push(<i class={[icon, 'sub-el-icon']} />);
      } else if (icon.startsWith('@/assets')) {
        // 图片路径（禁用点击和悬停效果）
        vnodes.push(
          <img 
            src={icon} 
            class="custom-icon no-click" 
            style={{ cursor: 'default' }}  // 强制箭头指针
          />
        );
      } else {
        // SVG 图标（保持可点击）
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    }

    if (title) {
      vnodes.push(<span class='menu-title'>{(title)}</span>);
    }

    return h('div', { class: 'menu-item' }, vnodes);
  }
}
</script>

<style scoped>
.menu-item {
  margin-top: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.sub-el-icon {
  font-size: 25px;
  color: currentColor;
  width: 50px;
  height: 50px;
  margin-bottom: -20px;
}

.custom-icon {
  width: 200px;
  height: 200px;
  margin-bottom: 8px;
}

/* 图片禁用点击和悬停效果 */
.no-click {
  pointer-events: none !important; 
  cursor: default !important;    
}

.menu-title {
  text-align: center;
  color: rgb(52, 51, 51);
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 0px;
  line-height: 1.6;
}
</style>