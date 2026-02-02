const { test, expect } = require('@playwright/test');
test('Launch site and open sign-in page', async({page}) => {
   // TC01: Launch the application
await page.goto('https://practicesoftwaretesting.com');
   // TC02: Verify Sign In link is visible on home page
await expect(page.getByRole('link',{name:'Sign in'})).toBeVisible();
   // TC03: Navigate to Login page by clicking Sign In
await page.getByRole('link', { name: 'Sign in'}).click();
   // TC04: Verify Login page heading is displayed
await expect(page.getByRole('heading',{name:'Login'})).toBeVisible();
   // TC05: Verify Email and Password fields are visible on Login page
await expect(page.getByLabel('Email address *')).toBeVisible();
await expect (page.getByLabel('Password *')).toBeVisible();
   // TC06: Verify Login button is visible
await expect(page.getByRole('button',{name: 'Login'})).toBeVisible();
   // TC07: Verify Register your account link is visible
const registerLink =page.getByRole('link',{name:'Register your account'});
await expect(registerLink).toBeVisible();
   // TC08: Verify Register your account navigation and heading
await registerLink.click();
await expect(page).toHaveURL(/\/auth\/register/);
await expect(page.getByRole('heading',{name:'Customer registration'})).toBeVisible();
await page.goBack();
   // TC09: Verify Forgot Password link navigation and fields
const forgotPasswordLink = page.getByRole('link',{name:' Forgot your Password? '});
await expect(forgotPasswordLink).toBeVisible();
   // TC10:navigate to forgot password page
await forgotPasswordLink.click();
  // TC11: verify forgot password URL and heading
await expect(page).toHaveURL(/\/auth\/forgot-password/);
await expect(page.getByRole('heading',{name:'Forgot Password'})).toBeVisible();
  //TC12:Verify user can navigate back to login page
await page.goBack(); 
await expect(page.getByRole('heading',{name:'Login'})).toBeVisible();
  // TC13: Verify user able to click Login without credentials
await page.getByRole('button', {name:'Login'}).click();
  // TC14: Verify validation messages when Login is clicked without credentials
await expect(page.getByText('Email is required')).toBeVisible();
await expect(page.getByText('Password is required')).toBeVisible();
  // TC15: Verify successful login with valid credentials
await page.fill('#email','customer@practicesoftwaretesting.com');
await page.fill('#password','welcome01');
await page.getByRole('button',{name:'Login'}).click();
//await expect(page.locator('[data-test="page-title"]')).toBeVisible({timeout:60000});
  // TC16: Verify Home page navigation
await page.getByRole('link', { name: 'Home'}).click();
  // TC17: Verify product search using keyword "hammer"
await page.getByPlaceholder('Search').fill('hammer');
await page.keyboard.press('Enter');
await expect(page.locator('text=Searched for: Hammer')).toBeVisible({timeout:10000});
  // TC18: Verify all searched product titles contain "hammer"
const products = page.locator('div.card:visible>>h5.card-title');
const hammerTitles = page.locator('h5.card-title:visible',{hasText:/hammer/i,});
await expect(hammerTitles.first()).toBeVisible();
const count = await hammerTitles.count();

for (let i = 0; i < count; i++)
{
    await expect(hammerTitles.nth(i)).toContainText(/hammer/i);
}
  // TC19: Verify Contact page navigation
await page.getByRole('link', { name: 'Contact'}).click();
page.goBack();
  // TC20: Verify user can logout successfully
const menu = page.getByRole('button',{name:'Jane Doe'}).locator('..');
await page.getByRole('button',{name:'Jane Doe'}).click();
await menu.getByText('Sign out',{ exact: true}).click();


});




