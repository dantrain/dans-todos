import { expect, test, type Page } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

test.beforeEach(async ({ page, request }) => {
  const googleResponse = await request.post(
    "https://www.googleapis.com/oauth2/v4/token",
    {
      data: {
        grant_type: "refresh_token",
        client_id: process.env.VITE_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
      },
    }
  );

  expect(googleResponse.ok()).toBeTruthy;
  const data = await googleResponse.json();
  expect(data.id_token).toBeDefined();

  const appResponse = await page.request.post("/signin", {
    form: { credential: data.id_token },
  });

  expect(appResponse.ok()).toBeTruthy;

  await prisma.todo.deleteMany();
  await page.goto("/");
});

const TODO_ITEMS = [
  "Buy some cheese",
  "Feed the cat",
  "Book a doctors appointment",
];

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    // Create 1st todo.
    await page
      .locator('[placeholder="What needs to be done?"]')
      .fill(TODO_ITEMS[0]);
    await page.locator('[placeholder="What needs to be done?"]').press("Enter");

    // Make sure the list only has one todo item.
    await expect(page.locator("li")).toHaveText([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await page
      .locator('[placeholder="What needs to be done?"]')
      .fill(TODO_ITEMS[1]);
    await page.locator('[placeholder="What needs to be done?"]').press("Enter");

    // Make sure the list now has two todo items.
    await expect(page.locator("li")).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    expect(await prisma.todo.count()).toEqual(2);
  });

  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    // Create one todo item.
    await page
      .locator('[placeholder="What needs to be done?"]')
      .fill(TODO_ITEMS[0]);
    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator('[placeholder="What needs to be done?"]').press("Enter"),
    ]);

    // Check that input is empty.
    await expect(
      page.locator('[placeholder="What needs to be done?"]')
    ).toBeEmpty();

    expect(await prisma.todo.count()).toEqual(1);
  });

  test("should append new items to the bottom of the list", async ({
    page,
  }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // Check test using different methods.
    await expect(page.locator("p")).toHaveText("3 items left");
    await expect(page.locator("p")).toContainText("3");
    await expect(page.locator("p")).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.locator("li")).toHaveText(TODO_ITEMS);
    expect(await prisma.todo.count()).toEqual(3);
  });

  test("should show #main and #footer when items added", async ({ page }) => {
    await page
      .locator('[placeholder="What needs to be done?"]')
      .fill(TODO_ITEMS[0]);
    await page.locator('[placeholder="What needs to be done?"]').press("Enter");

    await expect(page.locator("ul")).toBeVisible();
    await expect(page.locator("ul + hr + div")).toBeVisible();
    expect(await prisma.todo.count()).toEqual(1);
  });
});

test.describe("Mark all as completed", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await expect(await prisma.todo.count()).toEqual(3);
  });

  test.afterEach(async () => {
    await expect(await prisma.todo.count()).toEqual(3);
  });

  test("should allow me to mark all items as completed", async ({ page }) => {
    // Complete all todos.
    await page.locator('[aria-label="Mark all complete"]').click();

    const checkboxes = page.locator("input[type=checkbox]");

    for (let i = 0; i < (await checkboxes.count()); i++) {
      await expect(checkboxes.nth(i)).toBeChecked();
    }

    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(3);
  });

  test("should allow me to clear the complete state of all items", async ({
    page,
  }) => {
    // Check and then immediately uncheck.
    await page.locator('[aria-label="Mark all complete"]').click();
    await page.locator('[aria-label="Mark all incomplete"]').click();

    const checkboxes = page.locator("input[type=checkbox]");

    for (let i = 0; i < (await checkboxes.count()); i++) {
      await expect(checkboxes.nth(i)).not.toBeChecked();
    }
  });

  test("complete all checkbox should update state when items are completed / cleared", async ({
    page,
  }) => {
    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator('[aria-label="Mark all complete"]').click(),
    ]);
    await expect(page.locator('[aria-label="Mark all incomplete"]')).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.87)"
    );
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(3);

    // Uncheck first todo.
    const firstTodo = page.locator("li").nth(0);
    await Promise.all([
      page.waitForResponse("/graphql"),
      firstTodo.locator("input[type=checkbox]").uncheck(),
    ]);

    // Reuse toggleAll locator and make sure its not checked.
    await expect(page.locator('[aria-label="Mark all complete"]')).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.6)"
    );

    await Promise.all([
      page.waitForResponse("/graphql"),
      firstTodo.locator("input[type=checkbox]").check(),
    ]);
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(3);

    // Assert the toggle all is checked again.
    await expect(page.locator('[aria-label="Mark all incomplete"]')).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.87)"
    );
  });
});

test.describe("Item", () => {
  test("should allow me to mark items as complete", async ({ page }) => {
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator('[placeholder="What needs to be done?"]').fill(item);
      await page
        .locator('[placeholder="What needs to be done?"]')
        .press("Enter");
    }

    // Check first item.
    await page.locator("input[type=checkbox]").nth(0).check();

    // Check second item.
    await expect(page.locator("input[type=checkbox]").nth(1)).not.toBeChecked();
    await page.locator("input[type=checkbox]").nth(1).check();

    // Assert completed class.
    await expect(page.locator("input[type=checkbox]").nth(0)).toBeChecked();
    await expect(page.locator("input[type=checkbox]").nth(1)).toBeChecked();
  });

  test("should allow me to un-mark items as complete", async ({ page }) => {
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator('[placeholder="What needs to be done?"]').fill(item);
      await Promise.all([
        page.waitForResponse("/graphql"),
        page.locator('[placeholder="What needs to be done?"]').press("Enter"),
      ]);
    }

    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator("input[type=checkbox]").nth(0).check(),
    ]);
    await expect(page.locator("input[type=checkbox]").nth(0)).toBeChecked();
    await expect(page.locator("input[type=checkbox]").nth(1)).not.toBeChecked();
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(1);

    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator("input[type=checkbox]").nth(0).uncheck(),
    ]);
    await expect(page.locator("input[type=checkbox]").nth(0)).not.toBeChecked();
    await expect(page.locator("input[type=checkbox]").nth(1)).not.toBeChecked();
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(0);
  });

  test("should allow me to edit an item", async ({ page }) => {
    await createDefaultTodos(page);

    const todoItems = page.locator("li");
    const secondTodo = todoItems.nth(1);
    await expect(secondTodo.locator("textarea").nth(0)).toHaveValue(
      TODO_ITEMS[1]
    );
    await secondTodo.locator("textarea").nth(0).fill("Buy some sausages");
    await Promise.all([
      page.waitForResponse("/graphql"),
      secondTodo.locator("textarea").nth(0).press("Enter"),
    ]);

    // Explicitly assert the new text value.
    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "Buy some sausages",
      TODO_ITEMS[2],
    ]);

    expect(
      await prisma.todo.findMany({ select: { text: true } })
    ).toContainEqual({
      text: "Buy some sausages",
    });
  });
});

test.describe("Editing", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await expect(await prisma.todo.count()).toEqual(3);
  });

  test("should save edits on blur", async ({ page }) => {
    const todoItems = page.locator("li");
    await todoItems.nth(1).locator("textarea").nth(0).fill("Buy some sausages");
    await Promise.all([
      page.waitForResponse("/graphql"),
      todoItems
        .nth(1)
        .locator("textarea")
        .nth(0)
        .evaluate((node) => node.blur()),
    ]);

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "Buy some sausages",
      TODO_ITEMS[2],
    ]);

    expect(
      await prisma.todo.findMany({ select: { text: true } })
    ).toContainEqual({
      text: "Buy some sausages",
    });
  });

  test("should trim entered text", async ({ page }) => {
    const todoItems = page.locator("li");
    await todoItems
      .nth(1)
      .locator("textarea")
      .nth(0)
      .fill("    Buy some sausages    ");
    await Promise.all([
      page.waitForResponse("/graphql"),
      todoItems.nth(1).locator("textarea").nth(0).press("Enter"),
    ]);

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "Buy some sausages",
      TODO_ITEMS[2],
    ]);

    expect(
      await prisma.todo.findMany({ select: { text: true } })
    ).toContainEqual({
      text: "Buy some sausages",
    });
  });

  test("should cancel edits if an empty text string was entered", async ({
    page,
  }) => {
    const todoItems = page.locator("li");
    await todoItems.nth(1).locator("textarea").nth(0).fill("");
    await todoItems.nth(1).locator("textarea").nth(0).press("Enter");

    await expect(todoItems).toHaveText(TODO_ITEMS);
  });

  test.skip("should cancel edits on escape", async ({ page }) => {
    const todoItems = page.locator("li");
    await todoItems.nth(1).locator(".edit").press("Escape");
    await expect(todoItems).toHaveText(TODO_ITEMS);
  });
});

test.describe("Counter", () => {
  test("should display the current number of todo items", async ({ page }) => {
    await page
      .locator('[placeholder="What needs to be done?"]')
      .fill(TODO_ITEMS[0]);
    await page.locator('[placeholder="What needs to be done?"]').press("Enter");
    await expect(page.locator("p")).toContainText("1");

    await page
      .locator('[placeholder="What needs to be done?"]')
      .fill(TODO_ITEMS[1]);
    await page.locator('[placeholder="What needs to be done?"]').press("Enter");
    await expect(page.locator("p")).toContainText("2");

    await expect(await prisma.todo.count()).toEqual(2);
  });
});

test.describe("Clear completed button", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test("should display the correct text", async ({ page }) => {
    await page.locator("input[type=checkbox]").nth(0).check();
    await expect(page.locator("text=Clear completed")).toBeEnabled();
  });

  test("should remove completed items when clicked", async ({ page }) => {
    const todoItems = page.locator("li");
    await todoItems.nth(1).locator("input[type=checkbox]").check();
    await page.locator("text=Clear completed").click();
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should be disabled when there are no items that are completed", async ({
    page,
  }) => {
    await page.locator("input[type=checkbox]").nth(0).check();
    await page.locator("text=Clear completed").click();
    await expect(page.locator("text=Clear completed")).toBeDisabled();
  });
});

test.describe("Persistence", () => {
  test("should persist its data", async ({ page }) => {
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator('[placeholder="What needs to be done?"]').fill(item);
      await page
        .locator('[placeholder="What needs to be done?"]')
        .press("Enter");
    }

    const todoItems = page.locator("li");
    await todoItems.nth(0).locator("input[type=checkbox]").check();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(
      todoItems.nth(0).locator("input[type=checkbox]")
    ).toBeChecked();
    await expect(
      todoItems.nth(1).locator("input[type=checkbox]")
    ).not.toBeChecked();

    // Ensure there is 1 completed item.
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(1);

    // Now reload.
    await page.reload();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(
      todoItems.nth(0).locator("input[type=checkbox]")
    ).toBeChecked();
    await expect(
      todoItems.nth(1).locator("input[type=checkbox]")
    ).not.toBeChecked();
  });
});

test.describe("Routing", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test("should allow me to display active items", async ({ page }) => {
    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator("input[type=checkbox]").nth(1).check(),
    ]);
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(1);

    await page.locator("a >> text=Active").click();
    await expect(page.locator("li")).toHaveCount(2);
    await expect(page.locator("li")).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should respect the back button", async ({ page }) => {
    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator("input[type=checkbox]").nth(1).check(),
    ]);
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(1);

    await test.step("Showing all items", async () => {
      await page.locator("a >> text=All").click();
      await expect(page.locator("li")).toHaveCount(3);
    });

    await test.step("Showing active items", async () => {
      await page.locator("a >> text=Active").click();
    });

    await test.step("Showing completed items", async () => {
      await page.locator("a >> text=Completed").click();
    });

    await expect(page.locator("li")).toHaveCount(1);
    await page.goBack();
    await expect(page.locator("li")).toHaveCount(2);
    await page.goBack();
    await expect(page.locator("li")).toHaveCount(3);
  });

  test("should allow me to display completed items", async ({ page }) => {
    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator("input[type=checkbox]").nth(1).check(),
    ]);
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(1);
    await page.locator("a >> text=Completed").click();
    await expect(page.locator("li")).toHaveCount(1);
  });

  test("should allow me to display all items", async ({ page }) => {
    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator("input[type=checkbox]").nth(1).check(),
    ]);
    expect(await prisma.todo.count({ where: { completed: true } })).toEqual(1);
    await page.locator("a >> text=Active").click();
    await page.locator("a >> text=Completed").click();
    await page.locator("a >> text=All").click();
    await expect(page.locator("li")).toHaveCount(3);
  });

  test("should highlight the currently applied filter", async ({ page }) => {
    await expect(page.locator("a >> text=All")).toHaveCSS(
      "background-color",
      "rgba(63, 81, 181, 0.12)"
    );
    await page.locator("a >> text=Active").click();
    // Page change - active items.
    await expect(page.locator("a >> text=Active")).toHaveCSS(
      "background-color",
      "rgba(63, 81, 181, 0.12)"
    );
    await page.locator("a >> text=Completed").click();
    // Page change - completed items.
    await expect(page.locator("a >> text=Completed")).toHaveCSS(
      "background-color",
      "rgba(63, 81, 181, 0.12)"
    );
  });
});

async function createDefaultTodos(page: Page) {
  for (const item of TODO_ITEMS) {
    await page.locator('[placeholder="What needs to be done?"]').fill(item);
    await Promise.all([
      page.waitForResponse("/graphql"),
      page.locator('[placeholder="What needs to be done?"]').press("Enter"),
    ]);
  }
}
