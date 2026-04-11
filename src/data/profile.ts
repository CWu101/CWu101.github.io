import type { Profile } from "../types/profile";

export const profile: Profile = {
  sidebar: {
    name: "Qinkun",
    tagline: "「单纯只想把日子过得不浪费」",
  },
  about: [
    "Hi，我是 Qinkun（或者 Charles Wu），本科和硕士都在同济学习理工科，有 SQL、Python、TypeScript 基础。",
    "梦想是设计所有人都在使用的产品。",
  ],
  internships: [
    {
      company: "喜马拉雅",
      role: "首页产品经理",
      period: "2026.04 - 至今",
      summary: "参与首页个性化推荐内容设计。",
      logo: "/companies/ximalaya.jpg",
    },
  ],
  projects: [
    {
      name: "取舍相册 APP",
      period: "2026.03",
      status: "iOS 已上架",
      tagline: "独立负责人",
      summary:
        "取舍相册是一款 iOS 本地相册整理应用，围绕“照片太多难开始、整理过程枯燥、删除操作易误触”三类问题，设计了“分组整理 + 随机浏览 + 回顾确认”的整理流程与短视频风格交互，在保障本地隐私的前提下提升相册整理效率与体验。",
      tags: ["iOS", "相册整理", "交互设计", "本地隐私", "产品上线"],
    },
  ],
  contact: {
    description: "欢迎交流，向我发邮件以获取正式简历。",
    email: "charleswu101@qq.com",
    github: {
      label: "@CWu101",
      href: "https://github.com/CWu101",
    },
  },
};
