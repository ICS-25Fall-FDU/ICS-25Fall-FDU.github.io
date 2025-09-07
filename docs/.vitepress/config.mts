import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ICS-25Fall-FDU",
  description: "Course Homepage",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '团队', link: '/team' }
    ],

    sidebar: [
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ICS-25Fall-FDU' }
    ]
  }
})
