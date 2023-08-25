const { test, expect } = require("@playwright/test");

test("Main page has title 'Shared shopping lists' and 'No shopping lists yet.'", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("p")).toHaveText("No shopping lists yet.");
});

test("Main page has link with text 'Lists'", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a")).toHaveText("Lists");
});

test("Can create a shopping list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `Tester list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]>> text='Create new list'").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Can deactivate a shopping list.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=submit]>> text='Deactivate!'").click();
  await expect(page.locator("li")).toHaveCount(0);
});

test("Can add items to a shopping list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `Tester list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]>> text='Create new list'").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
  
  await page.goto("/lists/2");
  const itemName = `Tester item: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit]>> text='Add item'").click();
  await expect(page.locator(`li >> text='${itemName}'`)).toBeVisible();
});

test("Can collect items.", async ({ page }) => {
  await page.goto("/lists/2");
  await page.locator("input[type=submit]>> text='Mark collected!'").click();
  await expect(page.locator("del")).toBeVisible();
})

test("Main page shows statistics.", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("li >> text='Shopping lists: 2'")).toHaveText("Shopping lists: 2");
  await expect(page.locator("li >> text='Shopping list items: 1'")).toHaveText("Shopping list items: 1");
})