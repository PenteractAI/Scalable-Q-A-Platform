const { test, expect } = require("@playwright/test");

const TEST_COURSE_TITLE = 'Introduction to Data Science';
const TEST_QUESTION_TITLE = 'What exactly encompasses Data Science?';
const TEST_ANSWER_CONTENT = 'Data Science, to me, feels like a magic box sometimes. You have data coming in—could be numbers, text, or images—and then, after some statistical spells and machine learning charms, insights and predictions start popping out. It’s about making sense of data in a way that can help answer complex questions and solve real-world problems.';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
  const userUuid = `test-${Math.random().toString(36)}`;

  await page.evaluate((uuid) => {
    localStorage.setItem('userUuid', uuid);
    location.reload();
  }, userUuid);

  // Wait for the page to reload
  await page.waitForLoadState();

  // Navigate to the questions page of the first course
  const firstCourseCard = await page.locator(`a:has-text("${TEST_COURSE_TITLE}")`);
  await firstCourseCard.click();

  // Navigate to the question page of a certain question
  const firstQuestionCard = await page.locator(`a:has-text("${TEST_QUESTION_TITLE}")`);
  await firstQuestionCard.click();
});

test("Verifies that answers are recovered and shown on a question page.", async ({ page }) => {
  // Verify that the answer is retrieved from the database and shown on the page
  await expect(page).toHaveText(TEST_ANSWER_CONTENT);
});

test("Create a valid answer to a question and check its presence on the page.", async ({ page }) => {

  const newContent = 'Hello world!';
  await page.getByRole('textbox', { name: 'Write your answer here' }).fill(newContent);

  await page.getByRole('button', { name: 'Submit' }).click(z);

  // Verify that the answer is retrieved from the database and shown on the page
  await expect(page).toHaveText(newContent);
});

test("Create an empty answer to a question and check that it is not added to the page.", async ({ page }) => {

  const emptyStr = '';
  await page.getByRole('textbox', { name: 'Write your answer here' }).fill(emptyStr);

  await page.getByRole('button', { name: 'Submit' }).click();

  // Verify that the answer is not shown on the page
  await expect(page).not.toContainText(emptyStr);
});