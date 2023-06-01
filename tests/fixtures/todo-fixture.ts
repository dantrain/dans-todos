import type { Locator, Page } from "@playwright/test";
import { test as base } from "@playwright/test";
import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { Filter } from "../../src/client/pages/Home/Home.js";
import { todos } from "../../src/server/dbSchema.js";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

class TodoPage {
  readonly page: Page;
  readonly db: typeof db;

  readonly TODO_ITEMS = [
    "Buy some cheese",
    "Feed the cat",
    "Book a doctors appointment",
  ];

  readonly input: Locator;
  readonly toggleComplete: Locator;
  readonly toggleIncomplete: Locator;
  readonly list: Locator;
  readonly listItems: Locator;
  readonly listItemCheckboxes: Locator;
  readonly footer: Locator;
  readonly count: Locator;
  readonly clearCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.db = db;

    this.input = page.locator('[placeholder="What needs to be done?"]');
    this.toggleComplete = page.locator('[aria-label="Mark all complete"]');
    this.toggleIncomplete = page.locator('[aria-label="Mark all incomplete"]');
    this.list = page.locator("ul");
    this.listItems = page.locator("li");
    this.listItemCheckboxes = page.locator("input[type=checkbox]");
    this.footer = page.locator("ul + hr + div");
    this.count = page.locator("p");
    this.clearCompleted = page.locator("text=Clear completed");
  }

  async goto() {
    await this.page.goto("/");
  }

  async waitForApi() {
    await this.page.waitForResponse("/graphql");
  }

  async createDefaultTodos() {
    for (const item of this.TODO_ITEMS) {
      await this.input.fill(item);
      await Promise.all([this.waitForApi(), this.input.press("Enter")]);
    }
  }

  async getTodoCount(filter?: Filter) {
    const [{ count }] = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(todos)
      .where(
        filter === "active"
          ? eq(todos.completed, false)
          : filter === "completed"
          ? eq(todos.completed, true)
          : undefined
      );

    return +count;
  }
}

export const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.db.delete(todos);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from "@playwright/test";
