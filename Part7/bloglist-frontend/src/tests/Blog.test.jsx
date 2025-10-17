import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Vitest',
    url: 'vitest.com',
    likes: 100,
    user: {
      username: 'tester',
      name: 'Tester User'
    }
  }

  const user = {
    username: 'tester',
    name: 'Tester User'
  }

  const mockLike = vi.fn()
  const mockRemove = vi.fn()

  beforeEach(() => {
    render(<Blog blog={blog} user={user} handleLike={mockLike} handleRemove={mockRemove} />)
  })

  test('renders title and author but not URL or likes by default', () => {
    const container = screen.getByTestId('blog-container')
    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)

    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(`likes ${blog.likes}`)
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('after clicking the view button, URL and likes are displayed', async () => {
    const userEventSetup = userEvent.setup()
    const button = screen.getByText('View')
    await userEventSetup.click(button)

    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByText(`likes ${blog.likes}`)).toBeVisible()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const userEventSetup = userEvent.setup()
    const viewButton = screen.getByText('View')
    await userEventSetup.click(viewButton)

    const likeButton = screen.getByText('like')
    await userEventSetup.click(likeButton)
    await userEventSetup.click(likeButton)

    expect(mockLike).toHaveBeenCalledTimes(2)
  })
})
