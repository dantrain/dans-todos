import { expect, test } from "./fixtures/todo-fixture.js";

test.beforeEach(async ({ todoPage }) => {
  await todoPage.createDefaultTodos();
});

test("should allow me to display active items", async ({ todoPage, page }) => {
  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItemCheckboxes.nth(1).check(),
  ]);
  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(1);

  await page.locator("a >> text=Active").click();
  await expect(todoPage.listItems).toHaveCount(2);
  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    todoPage.TODO_ITEMS[2],
  ]);
});

test("should respect the back button", async ({ todoPage, page }) => {
  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItemCheckboxes.nth(1).check(),
  ]);
  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(1);

  await test.step("Showing all items", async () => {
    await page.locator("a >> text=All").click();
    await expect(todoPage.listItems).toHaveCount(3);
  });

  await test.step("Showing active items", async () => {
    await page.locator("a >> text=Active").click();
  });

  await test.step("Showing completed items", async () => {
    await page.locator("a >> text=Completed").click();
  });

  await expect(todoPage.listItems).toHaveCount(1);
  await page.goBack();
  await expect(todoPage.listItems).toHaveCount(2);
  await page.goBack();
  await expect(todoPage.listItems).toHaveCount(3);
});

test("should allow me to display completed items", async ({
  todoPage,
  page,
}) => {
  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItemCheckboxes.nth(1).check(),
  ]);
  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(1);
  await page.locator("a >> text=Completed").click();
  await expect(todoPage.listItems).toHaveCount(1);
});

test("should allow me to display all items", async ({ todoPage, page }) => {
  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItemCheckboxes.nth(1).check(),
  ]);
  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(1);
  await page.locator("a >> text=Active").click();
  await page.locator("a >> text=Completed").click();
  await page.locator("a >> text=All").click();
  await expect(todoPage.listItems).toHaveCount(3);
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
