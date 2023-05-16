import type { Locator, Page } from "@playwright/test";
import { test as base } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TodoPage {
  readonly page: Page;
  readonly prisma: PrismaClient;

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
    this.prisma = prisma;

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
}

export const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.prisma.todo.deleteMany();
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from "@playwright/test";
