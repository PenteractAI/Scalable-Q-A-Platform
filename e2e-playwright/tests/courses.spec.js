const { test, expect } = require("@playwright/test");

const TEST_COURSE_TITLE = 'Introduction to Data Science';
const TEST_COURSE_DESCRIPTION = 'A comprehensive course covering the basics of Data Science.';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
  const userUuid = `test-${Math.random().toString(36)}`;

  await page.evaluate((uuid) => {
    localStorage.setItem('userUuid', uuid);
    location.reload();
  }, userUuid);

  // Wait for the page to reload
  await page.waitForLoadState();
});

test("Verifies that courses are recovered and shown on the homepage.", async ({ page }) => {
  const firstCourseCard = await page.locator('.group').first();

  // Check the validity of the first course title
  await expect(firstCourseCard).toContainText(TEST_COURSE_TITLE);

  // Check the validity of the first course description
  const courseDescription = await page.locator(`p:below(:text("${TEST_COURSE_TITLE}"))`);
  await expect(courseDescription).toContainText(TEST_COURSE_DESCRIPTION);
});
