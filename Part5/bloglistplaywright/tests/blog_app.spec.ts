const { test, describe, expect, beforeEach } = require('@playwright/test')
const { createBlog, loginWith } = require('./helper')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'joona',
                username: 'joona',
                password: 'supersalainen'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('log in to the application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'joona', 'supersalainen')
            await expect(page.getByText('joona logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'joona', 'wrong')

            await expect(page.getByText('Wrong username or password')).toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'joona', 'supersalainen')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'a blog created by playwright')
            await expect(page.getByText('a blog created by playwright')).toBeVisible()
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'another blog by playwright')
            })

            test('it can be liked', async ({ page }) => {
                const blog = page.getByText('another blog by playwright').locator('..')
                await blog.getByRole('button', { name: 'view' }).click()

                const likes = blog.getByTestId('likes-count')
                const likeButton = blog.getByTestId('like-button')

                const initialLikes = parseInt(await likes.textContent())

                await likeButton.click()

                await expect(likes).toHaveText((initialLikes + 1).toString())
            })

            test('remove button is visible and blog can be removed', async ({ page }) => {
                const blog = page.getByTestId('blog-container').filter({ hasText: 'another blog by playwright' })

                await blog.getByRole('button', { name: 'view' }).click()

                const removeButton = blog.getByTestId('remove-button')
                await expect(removeButton).toBeVisible()

                page.on('dialog', dialog => dialog.accept())
                await removeButton.click()

                await expect(blog).toHaveCount(0)
            })

        })
    })
})