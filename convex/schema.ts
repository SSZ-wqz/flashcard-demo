import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cards: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    isArchived: v.optional(v.boolean()),
  })
    // 为 description 字段创建搜索索引
    .searchIndex("search_description", { searchField: "description" })
    // 为 date 字段创建搜索索引
    .searchIndex("search_date", { searchField: "date" })
    // 合并后的标题搜索索引，包含描述作为可选的过滤字段
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["description"],
    }),
});
