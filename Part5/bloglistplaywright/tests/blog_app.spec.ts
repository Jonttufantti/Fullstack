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

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'another blog by playwright')
            })

        })
    })
})