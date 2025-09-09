---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers, VPTeamPageSection
} from 'vitepress/theme'

const orgnization = [
    {
    avatar: '/assets/logo.png',
    name: 'ICS-25Fall-FDU',
    desc: '复旦大学计算机系统基础教师团队',
    links: [
      { icon: 'github', link: 'https://github.com/ICS-25Fall-FDU' },
    ]
  },
]

const members = [
  {
    avatar: '/assets/staff/fduTristin.png',
    name: '徐厚泽',
    desc: 'Keep exploring.',
    links: [
      { icon: 'github', link: 'https://github.com/fduTristin' },
    ]
  },
  {
    avatar: '/assets/staff/Zecyel.png',
    name: '朱程炀',
    desc: 'Make it funny. Enjoy its fun.',
    links: [
      { icon: 'github', link: 'https://github.com/Zecyel' },
    ]
  },
  {
    avatar: '/assets/staff/Caibao7.png',
    name: '蔡亦扬',
    desc: '生活就像海洋，只有意志坚强的人才能到达彼岸。',
    links: [
      { icon: 'github', link: 'https://github.com/Caibao7' },
    ]
  },
  {
    avatar: '/assets/staff/JurFal.png',
    name: '周弈成',
    desc: '欢迎（在各种地方）向TA提问！',
    links: [
      { icon: 'github', link: 'https://github.com/JurFal' },
    ]
  },
  {
    avatar: '/assets/staff/ranxiaoxiao-mmm.png',
    name: '马颢宸',
    desc: '理论是主线，lab是副本，请对boss狠狠出击！',
    links: [
      { icon: 'github', link: 'https://github.com/ranxiaoxiao-mmm' },
    ]
  },
  {
    avatar: '/assets/staff/xzh2004.png',
    name: '项正豪',
    desc: 'Stay Hungry, Stay Foolish.',
    links: [
      { icon: 'github', link: 'https://github.com/xzh2004' },
    ]
  },
  {
    avatar: '/assets/staff/ell77abu.png',
    name: '罗贤可昕',
    desc: '行く先がわからないけど、もう道に出ている。',
    links: [
      { icon: 'github', link: 'https://github.com/ell77abu' },
    ]
  },
]
</script>

<VPTeamPage>
<VPTeamPageSection>
    <template #title>组织</template>
    <template #members>
      <VPTeamMembers size="small" :members="orgnization" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>助教</template>
    <template #members>
      <VPTeamMembers size="small" :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
