import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { NavigationPage } from "../pages/NavigationFormsPage";
import { FormPage } from "../pages/CreateFormPage";
import { ListFormPage } from "../pages/ListFormPage";
import { generateRandomFormName } from "../utils/dataGenerator";

test("Create a form and validate that it is listed (via API)", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const nav = new NavigationPage(page);
  const formPage = new FormPage(page);
  const listPage = new ListFormPage(page);

  await page.goto("/login");
  await loginPage.login("admin", "test1234");

  await nav.goToFormsList();

  const formName = generateRandomFormName();
  await formPage.createFormWithAllFieldTypes(formName);
  await nav.goToFormsList();
  await listPage.waitAndAssertFormListedByApi(formName);
});
