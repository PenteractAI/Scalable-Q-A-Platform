const { test, expect } = require("@playwright/test");

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
  const firstCourseCard = await page.getByTestId('course-card').first();
  await firstCourseCard.click();

  await page.waitForSelector('[data-testid="question-card"]');
  const questions = page.getByTestId('question-card')
  const count = await questions.count();
  await expect(count).toBeGreaterThan(0);
});

test("Creates a new question for course 1 and verify its presence.", async ({ page }) => {

  // Navigate to the questions page of the first course
  const firstCourseCard = await page.getByTestId('course-card').first();
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
  const newQuestionTitle = await page.getByText(title).first();
  const newQuestionContent = await page.getByText(content).first();
  await expect(newQuestionTitle).toBeVisible();
  await expect(newQuestionContent).toBeVisible();

  // Verify that the card is retrieved on the course questions page
  const courseId = 1;
  await page.goto(`/${courseId}/questions`);

  const firstQuestionCard = await page.getByTestId('question-card').first();
  await expect(firstQuestionCard).toContainText(title);
  await expect(firstQuestionCard).toContainText(content);
});

test("Creates a new question for course 1 without a title and verify that it is not added.", async ({ page }) => {

  // Navigate to the questions page of the first course
  const firstCourseCard = await page.getByTestId('course-card').first();
  await firstCourseCard.click();

  // Navigate to the question creation form
  const askQuestionButton = await page.getByTestId('ask-question-button');
  await askQuestionButton.click();

  // Fill the form and submit it
  const title = '';
  await page.getByLabel('Title').fill(title);

  const content = 'Please, help me!!';
  await page.getByLabel('Content').fill(content);

  await page.getByTestId('submit-question-button').click();

  await expect(page).toHaveURL('/1/questions/new')
});

test("Creates a new question for course 1 without content and verify that it is not added.", async ({ page }) => {

  // Navigate to the questions page of the first course
  const firstCourseCard = await page.getByTestId('course-card').first();
  await firstCourseCard.click();

  // Navigate to the question creation form
  const askQuestionButton = await page.getByTestId('ask-question-button');
  await askQuestionButton.click();

  // Fill the form and submit it
  const title = 'Hello world!';
  await page.getByLabel('Title').fill(title);

  const content = '';
  await page.getByLabel('Content').fill(content);

  await page.getByTestId('submit-question-button').click();

  await expect(page).toHaveURL('/1/questions/new')
});

test("Creates a new question for course 1 with a title exceeding 100 characters and verify that it is not added.", async ({ page }) => {

  // Navigate to the questions page of the first course
  const firstCourseCard = await page.getByTestId('course-card').first();
  await firstCourseCard.click();

  // Navigate to the question creation form
  const askQuestionButton = await page.getByTestId('ask-question-button');
  await askQuestionButton.click();

  // Fill the form and submit it
  const title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra velit gravida lorem semper, sit amet ultrices velit convallis. Suspendisse nisl sem, consectetur tincidunt diam vitae, porttitor ullamcorper odio. Etiam eu lacus vitae tortor mattis scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis eros a sodales ornare. Praesent turpis velit, rutrum et odio quis, condimentum rhoncus felis. Vestibulum ac sem id erat dignissim sollicitudin a nec metus. Praesent imperdiet ex nulla, in vestibulum arcu semper at. Maecenas facilisis sed nibh at tincidunt. Curabitur eu ipsum quis tellus mollis tincidunt. Aliquam metus ante, tempus fermentum convallis id, pulvinar eu felis. Integer sed convallis urna. Nullam convallis, ex at tempus suscipit, quam risus iaculis tortor, vel laoreet ex dolor at ante. Etiam quis sapien rutrum felis rhoncus pulvinar bibendum a magna. Ut ultricies, neque eu rutrum gravida, neque lectus porta erat, eget aliquet justo dui sit amet diam. Sed nunc arcu, condimentum ac viverra at, volutpat at metus. Phasellus suscipit nunc eget neque aliquam, in fringilla mi finibus. Sed fringilla odio ac arcu faucibus sodales nec vitae odio. Nullam et consequat arcu. Donec rutrum et nisl a iaculis. Donec euismod aliquet sem non lobortis. Cras pretium, tortor ut laoreet ultrices, mauris arcu tincidunt neque, sit amet lacinia lacus turpis vitae tortor. Cras sit amet vestibulum lorem. Sed dignissim nunc in magna luctus, vitae aliquet enim fringilla. Fusce fringilla eget augue vel auctor. In quis rhoncus lorem. Vivamus laoreet vestibulum lectus in fermentum. Suspendisse tristique vulputate nunc a placerat. Aliquam.';
  await page.getByLabel('Title').fill(title);

  const content = 'Please, help me!!';
  await page.getByLabel('Content').fill(content);

  await page.getByTestId('submit-question-button').click();

  await expect(page).toHaveURL('/1/questions/new')
});