import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { FormPage } from '../pages/FormPage';
import { generateRandomFormName, generateRandomSectionName, generateRandomFields } from '../utils/dataGenerator';

test('Crear formulario con sección y campos', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const formPage = new FormPage(page);

  await page.goto('/login');
  await loginPage.login('admin', 'test1234');

  await formPage.navigateToFormSection();

  const formName = generateRandomFormName();
  const sectionName = generateRandomSectionName();
  const fields = generateRandomFields(2);

  await formPage.createForm(formName, sectionName, fields);
});
