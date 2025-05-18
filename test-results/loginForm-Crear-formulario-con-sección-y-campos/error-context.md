# Test info

- Name: Crear formulario con sección y campos
- Location: C:\Proyectos GitHub\Automatizacion Pacientes\tests\loginForm.spec.ts:6:5

# Error details

```
Error: locator.selectOption: Error: strict mode violation: getByRole('combobox') resolved to 2 elements:
    1) <select class="chakra-select css-1ri1w08">…</select> aka getByRole('region', { name: 'Seccion_spring_6950796009578663' }).getByRole('combobox')
    2) <select class="chakra-select css-8k9yvy">…</select> aka getByRole('dialog', { name: 'Agregar Campo' }).getByRole('combobox')

Call log:
  - waiting for getByRole('combobox')

    at FormPage.createForm (C:\Proyectos GitHub\Automatizacion Pacientes\pages\FormPage.ts:51:45)
    at C:\Proyectos GitHub\Automatizacion Pacientes\tests\loginForm.spec.ts:19:3
```

# Page snapshot

```yaml
- navigation:
  - button "Pacientes"
  - button "Historias Clínicas"
  - separator
  - button "Configuración"
  - button "Cerrar Sesión"
- main:
  - heading "Formularios" [level=2]
  - navigation "breadcrumb":
    - list:
      - listitem:
        - link "Configuración":
          - /url: /settings
          - img
          - paragraph: Configuración
        - paragraph: /
      - listitem:
        - link "Formularios":
          - /url: /settings/forms
          - img
          - paragraph: Formularios
        - paragraph: /
      - listitem:
        - img
        - paragraph: Creación
  - button "Formularios"
  - button "Crear Formulario"
  - heading "Configuración del Formulario" [level=2]
  - textbox "Nombre del formulario": Formulario_inconsequential_1003764248996780
  - paragraph: Consultorios
  - checkbox "test" [checked]
  - text: test
  - button "Agregar Sección"
  - heading "Seccion_spring_6950796009578663" [level=2]:
    - button "Seccion_spring_6950796009578663" [expanded]:
      - paragraph: Seccion_spring_6950796009578663
  - region "Seccion_spring_6950796009578663":
    - text: Vertical
    - button "Eliminar Sección"
    - textbox "Nombre de la sección": Seccion_spring_6950796009578663
    - combobox:
      - option "Vertical" [selected]
      - option "2 Columnas"
      - option "3 Columnas"
    - button "Agregar Campo"
    - button "Agregar Sección Interna"
    - separator
    - paragraph: ectoderm
    - textbox [disabled]
    - button "Editar campo"
    - button "Eliminar campo"
  - button "Guardar Formulario"
  - paragraph: "JSON:"
  - text: "{ \"sections\": [ { \"id\": \"c24f09a4-37c5-41ab-b0ce-67a2ce37b5b0\", \"name\": \"Seccion_spring_6950796009578663\", \"fields\": [ { \"id\": \"b247edc2-6a98-4ad9-a915-6b054fcc20dd\", \"label\": \"ectoderm\", \"type\": \"date\", \"required\": false, \"options\": [], \"new\": true, \"modified\": false } ], \"layout\": \"stacked\" } ] }"
- button:
  - img
- region "Notifications-top"
- region "Notifications-top-left"
- region "Notifications-top-right"
- region "Notifications-bottom-left"
- region "Notifications-bottom"
- region "Notifications-bottom-right"
- dialog "Agregar Campo":
  - banner: Agregar Campo
  - button "Close"
  - textbox "Etiqueta del campo": ectoderm
  - combobox:
    - option "Texto"
    - option "Número"
    - option "Fecha" [selected]
    - option "Checkbox"
    - option "Área de texto"
    - option "Select"
    - option "Radio"
    - option "Switch"
  - checkbox "Obligatorio"
  - text: Obligatorio
  - contentinfo:
    - button "Guardar"
    - button "Cancelar"
```

# Test source

```ts
   1 | import { Page } from "@playwright/test";
   2 |
   3 | export class FormPage {
   4 |   constructor(private page: Page) {}
   5 |
   6 |   async navigateToFormSection() {
   7 |     // Esperar y hacer clic en el botón "Configuración"
   8 |     await this.page.getByRole("button", { name: "Configuración" }).waitFor();
   9 |     await this.page.getByRole("button", { name: "Configuración" }).click();
  10 |
  11 |     // Clic en el ícono de Pacientes dentro de la navegación
  12 |     await this.page
  13 |       .getByRole("navigation")
  14 |       .filter({ hasText: "PacientesHistorias Clí" })
  15 |       .getByRole("img")
  16 |       .click();
  17 |
  18 |     // Esperar y entrar a "Formularios"
  19 |     await this.page.getByRole("button", { name: "Formularios" }).waitFor();
  20 |     await this.page.getByRole("button", { name: "Formularios" }).click();
  21 |   }
  22 |
  23 |   async createForm(
  24 |     formName: string,
  25 |     sectionName: string,
  26 |     fields: { label: string; type: string }[]
  27 |   ) {
  28 |     await this.page.getByRole("button", { name: "Crear Formulario" }).click();
  29 |
  30 |     await this.page.getByRole("main").locator("span").nth(2).click();
  31 |
  32 |     await this.page
  33 |       .getByRole("textbox", { name: "Nombre del formulario" })
  34 |       .fill(formName);
  35 |
  36 |     await this.page.getByRole("button", { name: "Agregar Sección" }).click();
  37 |
  38 |     await this.page
  39 |       .getByRole("textbox", { name: /Nombre de la sección/i })
  40 |       .fill(sectionName);
  41 |
  42 |     await this.page.getByRole("combobox");
  43 |
  44 |     await this.page.getByRole("button", { name: "Agregar Campo" }).click();
  45 |
  46 |     for (const field of fields) {
  47 |       await this.page
  48 |         .getByRole("textbox", { name: "Etiqueta del campo" })
  49 |         .fill(field.label);
  50 |
> 51 |       await this.page.getByRole("combobox").selectOption(field.type);
     |                                             ^ Error: locator.selectOption: Error: strict mode violation: getByRole('combobox') resolved to 2 elements:
  52 |
  53 |       await this.page.getByRole("button", { name: "Guardar" }).click();
  54 |     }
  55 |
  56 |     await this.page.getByRole("button", { name: "Guardar" }).click();
  57 |   }
  58 | }
  59 |
```