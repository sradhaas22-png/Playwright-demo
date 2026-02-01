const { test, expect } = require('@playwright/test');

test('Launch site and open sign-in page', async({page}) => {
// open the website
await page.goto('https://practicesoftwaretesting.com');
//check sign in button visible
await expect(page.getByRole('link',{name:'Sign in'})).toBeVisible();
// click sign in button
await page.getByRole('link', { name: 'Sign in'}).click();
//verify login page loaded and heading visible
await expect(page.getByRole('heading',{name:'Login'})).toBeVisible();
//verify form fields
await expect(page.getByLabel('Email address *')).toBeVisible();
await expect (page.getByLabel('Password *')).toBeVisible();
//verify login button
await expect(page.getByRole('button',{name: 'Login'})).toBeVisible();
//verify register your account link
const registerLink =page.getByRole('link',{name:'Register your account'});
await expect(registerLink).toBeVisible();
await registerLink.click();
//verify customer registration page 
await expect(page).toHaveURL(/\/auth\/register/);
await expect(page.getByRole('heading',{name:'Customer registration'})).toBeVisible();
await page.goBack();
//verify forgot your password link
const forgotPasswordLink = page.getByRole('link',{name:' Forgot your Password? '});
await expect(forgotPasswordLink).toBeVisible();
await forgotPasswordLink.click();
//verify forgot your password page
await expect(page).toHaveURL(/\/auth\/forgot-password/);
await expect(page.getByRole('heading',{name:'Forgot Password'})).toBeVisible();
await page.goBack(); 
//click login button without filling fields
await page.getByRole('button', {name:'Login'}).click();
//verify "validation" message
await expect(page.getByText('Email is required')).toBeVisible();
await expect(page.getByText('Password is required')).toBeVisible();
//login with valid credentials
await page.fill('#email','customer@practicesoftwaretesting.com');
await page.fill('#password','welcome01');
await page.getByRole('button',{name:'Login'}).click();
//wait for heading to appear
//await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
await expect(page.locator('[data-test="page-title"]')).toBeVisible({timeout:30000});
//verify home page
await page.getByRole('link', { name: 'Home'}).click();
//type hammer in search box
await page.getByPlaceholder('Search').fill('Hammer');
await page.keyboard.press('Enter');
//verify searched products
await expect(page.locator('text=Searched for: Hammer')).toBeVisible({timeout:10000});
const products = page.locator('div.card:visible>>h5.card-title');

const titles = page.locator('h5.card-title:visible');
const count = await titles.count();

for (let i = 0; i < count; i++)
{
    await expect(titles.nth(i)).toContainText(/Hammer/i);
}

});




