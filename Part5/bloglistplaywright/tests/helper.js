const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}


const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(content)
  await page.getByTestId('author').fill('playwright')
  await page.getByTestId('url').fill('playwrigth.com')
  await page.getByRole('button', { name: 'save' }).click()
}


export { loginWith, createBlog }