import { Role } from "@prisma/client";

export const roles: Partial<Role>[] = [
  { name: "admin", displayName: "مدیر سامانه" },
  { name: "pc", displayName: "مدیر کنترل پروژه" },
  { name: "po", displayName: "مدیر محصول" },
  { name: "qa", displayName: "مدیر تضمین کیفیت" },
  { name: "pm", displayName: "مدیر پروژه" },
  { name: "tm", displayName: "راهبر فنی" },
  { name: "dev", displayName: "توسعه دهنده" },
];
