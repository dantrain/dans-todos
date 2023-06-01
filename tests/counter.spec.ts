import { expect, test } from "./fixtures/todo-fixture.js";

test("should display the current number of todo items", async ({
  todoPage,
}) => {
  await todoPage.input.fill(todoPage.TODO_ITEMS[0]);
  await todoPage.input.press("Enter");
  await expect(todoPage.count).toContainText("1");

  await todoPage.input.fill(todoPage.TODO_ITEMS[1]);
  await todoPage.input.press("Enter");
  await expect(todoPage.count).toContainText("2");

  await expect(await todoPage.getTodoCount()).toEqual(2);
});
