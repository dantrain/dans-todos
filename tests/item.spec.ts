import { todos } from "../src/server/dbSchema.js";
import { expect, test } from "./fixtures/todo-fixture.js";

test("should allow me to mark items as complete", async ({ todoPage }) => {
  for (const item of todoPage.TODO_ITEMS.slice(0, 2)) {
    await todoPage.input.fill(item);
    await todoPage.input.press("Enter");
  }

  await todoPage.listItemCheckboxes.nth(0).check();

  await expect(todoPage.listItemCheckboxes.nth(1)).not.toBeChecked();
  await todoPage.listItemCheckboxes.nth(1).check();

  await expect(todoPage.listItemCheckboxes.nth(0)).toBeChecked();
  await expect(todoPage.listItemCheckboxes.nth(1)).toBeChecked();
});

test("should allow me to un-mark items as complete", async ({ todoPage }) => {
  // Create two items.
  for (const item of todoPage.TODO_ITEMS.slice(0, 2)) {
    await todoPage.input.fill(item);
    await Promise.all([todoPage.waitForApi(), todoPage.input.press("Enter")]);
  }

  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItemCheckboxes.nth(0).check(),
  ]);
  await expect(todoPage.listItemCheckboxes.nth(0)).toBeChecked();
  await expect(todoPage.listItemCheckboxes.nth(1)).not.toBeChecked();
  expect(await todoPage.getTodoCount("completed")).toEqual(1);

  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItemCheckboxes.nth(0).uncheck(),
  ]);
  await expect(todoPage.listItemCheckboxes.nth(0)).not.toBeChecked();
  await expect(todoPage.listItemCheckboxes.nth(1)).not.toBeChecked();
  expect(await todoPage.getTodoCount("completed")).toEqual(0);
});

test("should allow me to edit an item", async ({ todoPage }) => {
  await todoPage.createDefaultTodos();

  const secondTodo = todoPage.listItems.nth(1);
  await expect(secondTodo.locator("textarea").nth(0)).toHaveValue(
    todoPage.TODO_ITEMS[1]
  );
  await secondTodo.locator("textarea").nth(0).fill("Buy some sausages");
  await Promise.all([
    todoPage.waitForApi(),
    secondTodo.locator("textarea").nth(0).press("Enter"),
  ]);

  // Explicitly assert the new text value.
  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    "Buy some sausages",
    todoPage.TODO_ITEMS[2],
  ]);

  expect(
    await todoPage.db.select({ text: todos.text }).from(todos)
  ).toContainEqual({
    text: "Buy some sausages",
  });
});
