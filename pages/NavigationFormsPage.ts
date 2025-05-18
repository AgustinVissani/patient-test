import { Page } from "@playwright/test";

export class NavigationPage {
  constructor(private page: Page) {}

  async goToFormsList() {
    await this.page.getByRole("button", { name: "Configuración" }).waitFor();
    await this.page.getByRole("button", { name: "Configuración" }).click();

    await this.page
      .getByRole("navigation")
      .filter({ hasText: "PacientesHistorias Clí" })
      .getByRole("img")
      .click();

    await this.page
      .getByRole('navigation')
      .getByRole('button', { name: 'Formularios' })
      .click();
  }
}
