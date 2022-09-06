import { expect, test } from "./fixtures/todo-fixture.js";

test.beforeEach(async ({ todoPage }) => {
  await todoPage.createDefaultTodos();
  await expect(await todoPage.prisma.todo.count()).toEqual(3);
});

test.afterEach(async ({ todoPage }) => {
  await expect(await todoPage.prisma.todo.count()).toEqual(3);
});

test("should allow me to mark all items as completed", async ({ todoPage }) => {
  // Complete all todos.
  await todoPage.toggleComplete.click();

  for (let i = 0; i < (await todoPage.listItemCheckboxes.count()); i++) {
    await expect(todoPage.listItemCheckboxes.nth(i)).toBeChecked();
  }

  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(3);
});

test("should allow me to clear the complete state of all items", async ({
  todoPage,
}) => {
  // Check and then immediately uncheck.
  await todoPage.toggleComplete.click();
  await todoPage.toggleIncomplete.click();

  for (let i = 0; i < (await todoPage.listItemCheckboxes.count()); i++) {
    await expect(todoPage.listItemCheckboxes.nth(i)).not.toBeChecked();
  }
});

test("complete all checkbox should update state when items are completed / cleared", async ({
  todoPage,
}) => {
  await Promise.all([todoPage.waitForApi(), todoPage.toggleComplete.click()]);
  await expect(todoPage.toggleIncomplete).toHaveCSS(
    "color",
    "rgba(0, 0, 0, 0.87)"
  );
  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(3);

  // Uncheck first todo.
  const firstTodoCheckbox = todoPage.listItemCheckboxes.nth(0);
  await Promise.all([todoPage.waitForApi(), firstTodoCheckbox.uncheck()]);

  await expect(todoPage.toggleComplete).toHaveCSS(
    "color",
    "rgba(0, 0, 0, 0.6)"
  );

  await Promise.all([todoPage.waitForApi(), firstTodoCheckbox.check()]);
  expect(
    await todoPage.prisma.todo.count({ where: { completed: true } })
  ).toEqual(3);

  await expect(todoPage.toggleIncomplete).toHaveCSS(
    "color",
    "rgba(0, 0, 0, 0.87)"
  );
});
