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

test("Verifies that questions are recovered and shown on the course page.", async ({ page }) => {

  // Navigate to the questions page of the first course
  const firstCourseCard = await page.locator('.group').first();
  await firstCourseCard.click();

  // Verify the validity of the first question title
  const title = 'What exactly encompasses Data Science?';
  const firstQuestionCard = await page.locator('.group').first();
  await expect(firstQuestionCard).toContainText(title);

  // Verify the validity of the first question title
  const content = "I'm new to the field and curious about the main components that define Data Science.";
  const courseDescription = await page.locator(`p:below(:text("${title}"))`);
  await expect(courseDescription).toContainText(content);
});

test("Creates a new question for course 1 and verify its presence.", async ({ page }) => {

  // Navigate to the questions page of the first course
  const firstCourseCard = await page.locator('.group').first();
  await firstCourseCard.click();

  // Navigate to the question creation form
  const askQuestionButton = await page.getByTestId('ask-question-button');
  await askQuestionButton.click();

  // Fill the form and submit it
  const title = 'How to create a Playwright test?';
  await page.getByLabel('Title').fill(title);

  const content = 'Please, help me!!';
  await page.getByLabel('Content').fill(content);

  await page.getByTestId('submit-question-button').click();

  // The user is redirected to the question page
  // Verify the information
  await expect(page.getByText(title)).toBeVisible();
  await expect(page.getByText(content)).toBeVisible();

  // Verify that the card is retrieved on the course questions page
  const courseId = 1;
  await page.goto(`/${courseId}/questions`);

  const firstQuestionCard = await page.locator('.group').first();
  await expect(firstQuestionCard).toContainText(title);

  const courseDescription = await page.locator(`p:below(:text("${title}"))`);
  await expect(courseDescription).toContainText(content);
});

// TODO: Test to add a question without title
// TODO: Test to add a question without content
// TODO: Test to add a question with a title with more characters than expected