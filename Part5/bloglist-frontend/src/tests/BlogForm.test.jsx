import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onBlogCreated with correct details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm onBlogCreated={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Enter title')
  const authorInput = screen.getByPlaceholderText('Enter author')
  const urlInput = screen.getByPlaceholderText('Enter url')
  const submitButton = screen.getByText('save')

  await user.type(titleInput, 'My new blog')
  await user.type(authorInput, 'Joona')
  await user.type(urlInput, 'https://example.com')
  await user.click(submitButton)

  // Check the event handler was called correctly
  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'My new blog',
    author: 'Joona',
    url: 'https://example.com'
  })
})
