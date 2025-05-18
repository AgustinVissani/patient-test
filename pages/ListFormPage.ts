import { Page, expect, APIResponse } from '@playwright/test';

export class ListFormPage {
  constructor(private page: Page) {}

  async waitAndAssertFormListedByApi(formName: string): Promise<void> {
    await this.page.getByRole('button', { name: 'Crear Formulario' }).click();

    const [response] = await Promise.all([
      this.page.waitForResponse(res =>
        res.url().includes('/api/templates') && res.request().method() === 'GET'
      ),
      this.page.getByRole('button', { name: 'Formularios' }).click(),
    ]);

    expect(response.status()).toBe(200);
    const templates = await response.json();
    const found = templates.find((t: any) => t.name === formName);
    expect(found).toBeTruthy();
    expect(found.name).toBe(formName);
  }

  async assertFormVisibleInList(formName: string): Promise<void> {
    await expect(
      this.page.getByText(formName, { exact: true })
    ).toBeVisible();
  }
}
