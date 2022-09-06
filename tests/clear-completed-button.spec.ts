import { expect, test } from "./fixtures/todo-fixture.js";

test.beforeEach(async ({ todoPage }) => {
  await todoPage.createDefaultTodos();
});

test("should display the correct text", async ({ todoPage }) => {
  await todoPage.listItemCheckboxes.nth(0).check();
  await expect(todoPage.clearCompleted).toBeEnabled();
});

test("should remove completed items when clicked", async ({ todoPage }) => {
  await todoPage.listItemCheckboxes.nth(1).check();
  await todoPage.clearCompleted.click();
  await expect(todoPage.listItems).toHaveCount(2);
  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    todoPage.TODO_ITEMS[2],
  ]);
});

test("should be disabled when there are no items that are completed", async ({
  todoPage,
}) => {
  await todoPage.listItemCheckboxes.nth(0).check();
  await todoPage.clearCompleted.click();
  await expect(todoPage.clearCompleted).toBeDisabled();
});
