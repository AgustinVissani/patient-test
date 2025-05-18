import { Page } from "@playwright/test";

export class FormPage {
  constructor(private page: Page) {}

  async navigateToFormSection() {
    // Esperar y hacer clic en el botón "Configuración"
    await this.page.getByRole("button", { name: "Configuración" }).waitFor();
    await this.page.getByRole("button", { name: "Configuración" }).click();

    // Clic en el ícono de Pacientes dentro de la navegación
    await this.page
      .getByRole("navigation")
      .filter({ hasText: "PacientesHistorias Clí" })
      .getByRole("img")
      .click();

    // Esperar y entrar a "Formularios"
    await this.page.getByRole("button", { name: "Formularios" }).waitFor();
    await this.page.getByRole("button", { name: "Formularios" }).click();
  }

  async createForm(
    formName: string,
    sectionName: string,
    fields: { label: string; type: string }[]
  ) {
    await this.page.getByRole("button", { name: "Crear Formulario" }).click();

    await this.page.getByRole("main").locator("span").nth(2).click();

    await this.page
      .getByRole("textbox", { name: "Nombre del formulario" })
      .fill(formName);

    await this.page.getByRole("button", { name: "Agregar Sección" }).click();

    await this.page
      .getByRole("textbox", { name: /Nombre de la sección/i })
      .fill(sectionName);

    await this.page.getByRole("combobox");

    await this.page.getByRole("button", { name: "Agregar Campo" }).click();

    for (const field of fields) {
      await this.page
        .getByRole("textbox", { name: "Etiqueta del campo" })
        .fill(field.label);

      await this.page.getByRole("combobox").selectOption(field.type);

      await this.page.getByRole("button", { name: "Guardar" }).click();
    }

    await this.page.getByRole("button", { name: "Guardar" }).click();
  }
}
