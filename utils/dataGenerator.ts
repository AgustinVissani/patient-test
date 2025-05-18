import { faker } from '@faker-js/faker';

export function generateRandomFormName(): string {
  return `Formulario_${faker.word.adjective()}_${faker.number.int()}`;
}

export function generateRandomSectionName(): string {
  return `Seccion_${faker.word.noun()}_${faker.number.int()}`;
}

export function generateRandomFields(count: number): { label: string; type: string }[] {
  const types = ['text', 'number', 'date'];
  return Array.from({ length: count }, () => ({
    label: faker.word.noun(),
    type: types[Math.floor(Math.random() * types.length)]
  }));
}