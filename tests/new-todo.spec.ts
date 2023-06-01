import { expect, test } from "./fixtures/todo-fixture.js";

test("should allow me to add todo items", async ({ todoPage }) => {
  await todoPage.input.fill(todoPage.TODO_ITEMS[0]);
  await todoPage.input.press("Enter");

  await expect(todoPage.listItems).toHaveText([todoPage.TODO_ITEMS[0]]);

  await todoPage.input.fill(todoPage.TODO_ITEMS[1]);
  await todoPage.input.press("Enter");

  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    todoPage.TODO_ITEMS[1],
  ]);
  expect(await todoPage.getTodoCount()).toEqual(2);
});

test("should clear text input field when an item is added", async ({
  todoPage,
}) => {
  await todoPage.input.fill(todoPage.TODO_ITEMS[0]);
  await Promise.all([todoPage.waitForApi(), todoPage.input.press("Enter")]);

  await expect(todoPage.input).toBeEmpty();

  expect(await todoPage.getTodoCount()).toEqual(1);
});

test("should append new items to the bottom of the list", async ({
  todoPage,
}) => {
  await todoPage.createDefaultTodos();

  await expect(todoPage.count).toHaveText("3 items left");

  await expect(todoPage.listItems).toHaveText(todoPage.TODO_ITEMS);
  expect(await todoPage.getTodoCount()).toEqual(3);
});

test("should show todo list and footer when items added", async ({
  todoPage,
}) => {
  await todoPage.input.fill(todoPage.TODO_ITEMS[0]);
  await todoPage.input.press("Enter");

  await expect(todoPage.list).toBeVisible();
  await expect(todoPage.footer).toBeVisible();
  expect(await todoPage.getTodoCount()).toEqual(1);
});
