import { expect, test } from "./fixtures/todo-fixture.js";

test("should persist its data", async ({ todoPage, page }) => {
  for (const item of todoPage.TODO_ITEMS.slice(0, 2)) {
    await todoPage.input.fill(item);
    await todoPage.input.press("Enter");
  }

  await Promise.all([
    todoPage.waitForApi(),
    todoPage.listItemCheckboxes.nth(0).check(),
  ]);

  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    todoPage.TODO_ITEMS[1],
  ]);
  await expect(todoPage.listItemCheckboxes.nth(0)).toBeChecked();
  await expect(todoPage.listItemCheckboxes.nth(1)).not.toBeChecked();

  await todoPage.waitForApi();

  // Ensure there is 1 completed item.
  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(1);

  // Now reload.
  await page.reload();
  await expect(todoPage.listItems).toHaveText([
    todoPage.TODO_ITEMS[0],
    todoPage.TODO_ITEMS[1],
  ]);
  await expect(todoPage.listItemCheckboxes.nth(0)).toBeChecked();
  await expect(todoPage.listItemCheckboxes.nth(1)).not.toBeChecked();
});
