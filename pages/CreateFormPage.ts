import { Page } from "@playwright/test";

export class FormPage {
  constructor(private page: Page) {}

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

    await this.page.getByRole("button", { name: "Agregar Sección", exact: true }).click();
    await this.page
      .getByRole("textbox", { name: /Nombre de la sección/i })
      .fill(sectionName);

    await this.page.getByRole("button", { name: "Agregar Campo" }).click();

    for (const field of fields) {
      await this.page
        .getByRole("textbox", { name: "Etiqueta del campo" })
        .fill(field.label);

      await this.page.getByRole("combobox").selectOption(field.type);

      await this.page.getByRole("button", { name: "Guardar", exact: true }).click();
    }

    await this.page.getByRole("button", { name: "Guardar Formulario" }).click();
  }

async createFormWithAllFieldTypes(formName: string) {
  const fieldTypes = [
    { label: 'Texto', type: 'text' },
    { label: 'Número', type: 'number' },
    { label: 'Fecha', type: 'date' },
    { label: 'Checkbox', type: 'checkbox' },
    { label: 'Área de texto', type: 'textarea' },
    { label: 'Select', type: 'select' },
    { label: 'Radio', type: 'radio' },
    { label: 'Switch', type: 'switch' }
  ];

  await this.page.getByRole("button", { name: "Crear Formulario" }).click();
  await this.page.getByRole("main").locator("span").nth(2).click();
  await this.page.getByRole("textbox", { name: "Nombre del formulario" }).fill(formName);

  for (let i = 0; i < fieldTypes.length; i++) {
    const field = fieldTypes[i];
    const sectionName = `Sección ${i + 1}`;

    // Agregar sección
    await this.page.getByRole("button", { name: "Agregar Sección", exact: true }).click();

    // Esperar a que aparezca la nueva sección
    const secciones = this.page.locator(".chakra-accordion__item");
    const index = await secciones.count() - 1;
    const nuevaSeccion = secciones.nth(index);

    // Expandir sección si está colapsada
    const botonAcordion = nuevaSeccion.locator("button.chakra-accordion__button");
    const expanded = await botonAcordion.getAttribute("aria-expanded");
    if (expanded === "false") {
      await botonAcordion.click();
    }

    // Llenar el nombre de la sección
    await nuevaSeccion.getByPlaceholder("Nombre de la sección").fill(sectionName);

    // Agregar campo dentro de esta sección
    await nuevaSeccion.getByRole("button", { name: "Agregar Campo" }).click();

    // Completar modal del campo
    await this.page.getByRole("textbox", { name: "Etiqueta del campo" }).fill(`Campo ${field.label}`);
    await this.page.getByRole("combobox").selectOption(field.type);
    await this.page.getByRole("button", { name: "Guardar", exact: true }).click();
  }

  // Guardar todo el formulario
  await this.page.getByRole("button", { name: "Guardar Formulario" }).click();
}


}
