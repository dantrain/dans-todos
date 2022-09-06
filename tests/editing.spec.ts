import { expect, test } from "./fixtures/todo-fixture.js";

test.beforeEach(async ({ todoPage }) => {
  await todoPage.createDefaultTodos();
  await expect(await todoPage.prisma.todo.count()).toEqual(3);
});

test("should save edits on blur", async ({ todoPage }) => {
  await todoPage.listItems
    .nth(1)
    .locator("textarea")
    .nth(0)
    .fill("Buy some sausages");
  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItems
      .nth(1)
      .locator("textarea")
      .nth(0)
      .evaluate((node) => node.blur()),
  ]);

  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    "Buy some sausages",
    todoPage.TODO_ITEMS[2],
  ]);

  expect(
    await todoPage.prisma.todo.findMany({ select: { text: true } })
  ).toContainEqual({
    text: "Buy some sausages",
  });
});

test("should trim entered text", async ({ todoPage }) => {
  await todoPage.listItems
    .nth(1)
    .locator("textarea")
    .nth(0)
    .fill("    Buy some sausages    ");
  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItems.nth(1).locator("textarea").nth(0).press("Enter"),
  ]);

  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    "Buy some sausages",
    todoPage.TODO_ITEMS[2],
  ]);

  expect(
    await todoPage.prisma.todo.findMany({ select: { text: true } })
  ).toContainEqual({
    text: "Buy some sausages",
  });
});

test("should cancel edits if an empty text string was entered", async ({
  todoPage,
}) => {
  await todoPage.listItems.nth(1).locator("textarea").nth(0).fill("");
  await todoPage.listItems.nth(1).locator("textarea").nth(0).press("Enter");

  await expect(todoPage.listItems).toHaveText(todoPage.TODO_ITEMS);
});

test.skip("should cancel edits on escape", async ({ todoPage }) => {
  await todoPage.listItems.nth(1).locator(".edit").press("Escape");
  await expect(todoPage.listItems).toHaveText(todoPage.TODO_ITEMS);
});
