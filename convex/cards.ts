import { v } from "convex/values";
import { mutation, query } from "../convex/_generated/server";

export const createCard = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const card = await ctx.db.insert("cards", args);
    return card;
  },
});

export const getAllCards = query({
  args: {},
  handler: async (ctx) => {
    const cards = await ctx.db.query("cards").collect();
    return cards;
  },
});
