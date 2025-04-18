import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: true, // 默认展开
    withoutAnimation: false
  },
  device: 'desktop'
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = true; // 强制展开
    state.sidebar.withoutAnimation = false;
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = true; // 强制展开
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
