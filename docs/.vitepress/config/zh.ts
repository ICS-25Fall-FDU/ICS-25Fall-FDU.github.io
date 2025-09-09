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
      text: '大纲',
      link: '/schedule'
    },
    {
      text: '实验',
      items: [
        { text: 'Lab0: Linux & Git', link: '/lab/lab0' }
      ]
    },
    {
      text: '人员',
      link: '/team'
    },
  ]
}
