import { InferModel, relations } from "drizzle-orm";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export type User = InferModel<typeof users>;

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false).notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
});

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, { fields: [todos.userId], references: [users.id] }),
}));

export type Todo = InferModel<typeof todos>;
