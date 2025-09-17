import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: 'FDUer 计算机入门指南',

  themeConfig: {
    nav: nav(),

    sidebar: sidebarGuide(),

    editLink: {
      pattern: 'https://github.com/ICS-25Fall-FDU/ICS-25Fall-FDU.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '首页', link: '/' },
    { text: '团队', link: '/team' }
  ]
}

function sidebarGuide(): DefaultTheme.Sidebar {
  return [
    {
      text: '首页',
      link: '/index'
    },
    {
      text: '实验',
      items: [
        { text: 'ICS 实验入门手册', link: '/lab/manual' },
        { text: 'Lab0', link: '/lab/lab0' },
      ]
    },
    {
      text: '附录',
      items: [
        { text: '提问的艺术', link: '/appendix/how-to-ask' },
        { text: '使用 SSH 连接服务器', link: '/appendix/ssh-server' },
        { text: '使用 Watt Toolkit 代理访问 GitHub', link: '/appendix/watt_toolkit' },
        { text: '杂项问题 Q & A', link: '/appendix/misc-qa' }
      ]
    },
    {
      text: '团队',
      link: '/team'
    },
  ]
}
