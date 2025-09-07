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
    avatar: 'https://www.github.com/ICS-25Fall-FDU.png',
    name: 'ICS-25Fall-FDU',
    desc: '复旦大学计算机系统基础教师团队',
    links: [
      { icon: 'github', link: 'https://github.com/ICS-25Fall-FDU' },
    ]
  },
]

const members = [
  {
    avatar: 'https://www.github.com/fduTristin.png',
    name: '徐厚泽',
    desc: 'Just enjoy it',
    links: [
      { icon: 'github', link: 'https://github.com/fduTristin' },
    ]
  },
  {
    avatar: 'https://www.github.com/Zecyel.png',
    name: '朱程炀',
    links: [
      { icon: 'github', link: 'https://github.com/Zecyel' },
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
