import { Page } from '@playwright/test';
import selectors from '../selectors/login.json';

export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.fill(selectors.email, email);
    await this.page.fill(selectors.password, password);
    await this.page.click(selectors.loginButton);
  }
}
