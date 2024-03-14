const { test, expect } = require("@playwright/test");

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
  const firstCourseCard = await page.getByTestId('course-card').first();
  await firstCourseCard.click();

  // Navigate to the question page of a certain question
  const firstQuestionCard = await page.getByTestId('question-card').first();
  await firstQuestionCard.click();

  await page.waitForLoadState();
});

test("Verifies that answers are recovered and shown on a question page.", async ({ page }) => {
  // Verify that answer are retrieved from the database and shown on the page
  await page.waitForSelector('[data-testid="answer-card"]');
  const answers = await page.getByTestId('answer-card');
  const count = await answers.count();
  await expect(count).toBeGreaterThan(0);
});

test("Create a valid answer to a question and check its presence on the page.", async ({ page }) => {

  const newContent = 'Hello world!';
  await page.waitForSelector('[data-testid="answer-textarea"]', { timeout: 20000 });
  const textarea = await page.getByTestId('answer-textarea');
  await textarea.fill(newContent);

  await page.getByTestId('submit-answer').click();

  const answers = await page.getByTestId('answer-card');
  const firstAnswer = await answers.first();

  // Verify that the answer is retrieved from the database and shown on the page
  await expect(firstAnswer).toContainText(newContent);
});

test("Create an empty answer to a question and check that it is not added to the page.", async ({ page }) => {
  await page.waitForSelector('[data-testid="answer-card"]');
  const countBefore = await page.getByTestId('answer-card').count();

  const emptyStr = '';
  await page.waitForSelector('[data-testid="answer-textarea"]', { timeout: 20000 });

  const textarea = await page.getByTestId('answer-textarea');
  await textarea.fill(emptyStr);

  await page.getByTestId('submit-answer').click();

  await page.waitForSelector('[data-testid="error-message"]', { state: 'visible' });

  // Verify that the answer is not shown on the page
  const countAfter = await page.getByTestId('answer-card').count();

  await expect(countAfter).toStrictEqual(countBefore);
});