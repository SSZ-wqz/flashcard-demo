import { v } from "convex/values";
import { mutation, query } from "../convex/_generated/server";

// 创建卡片
export const createCard = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
    isArchived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const card = await ctx.db.insert("cards", args);
    return card;
  },
});

// 获取所有卡片
export const getAllCards = query({
  args: {},
  handler: async (ctx, args) => {
    const cards = await ctx.db.query("cards").collect();
    return cards;
  },
});

// 获取未归档的卡片 -- 这里的未归档就是没学会的
export const getUnarchivedCards = query({
  args: {},
  handler: async (ctx, args) => {
    const cards = await ctx.db
      .query("cards")
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();
    return cards;
  }
});

// 获取已归档的卡片 -- 这里的已归档就是学会了
export const getArchivedCards = query({
  args: {},
  handler: async (ctx, args) => {
    const cards = await ctx.db
      .query("cards")
      .filter((q) => q.eq(q.field("isArchived"), true))
      .collect();
    return cards;
  },
});
