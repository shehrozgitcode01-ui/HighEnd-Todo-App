import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const addTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {

    const TodoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false
    });

    return { TodoId };
  },
});

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").order("desc").collect();
  },
});

export const mark_done_Todo = mutation({
  args: {
    id: v.id("todos"),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isCompleted: args.isCompleted,
    });
  },
});

export const mark_undone_Todo = mutation({
  args: {
    id: v.id("todos"),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isCompleted: args.isCompleted,
    });
  },
});


/* DELETE TODO */
export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

//Edit Todo
export const editTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, { id, text }) => {
    await ctx.db.patch(id, {
      text,
    });
  },
});

/* DELETE MULTIPLE TODO */
export const deleteMultipleTodo = mutation({
  // 1. Change 'id' to 'ids' and make it an array of IDs
  args: {
    ids: v.array(v.id("todos")), 
  },
  handler: async (ctx, args) => {
    // 2. Loop through each ID and delete it
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});

// this is production server 12 40 from t-todo