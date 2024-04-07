import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test("renders title and author but doesnt render url and likes", () => {
  const blog = {
        title: "front test",
        author: "tester",
        url: "www.test.com",
        likes: 20
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText("front test tester")
  const element2 = screen.queryByText("www.test.com")
  const element3 = screen.queryByText("likes: 20")
  expect(element).toBeDefined()
  expect(element2).toBeNull()
  expect(element3).toBeNull()
})

test("renders url and likes when clicked view button", async () => {
    const blog = {
        title: "front test",
        author: "tester",
        url: "www.test.com",
        likes: 20
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)
    const element = screen.getByText("www.test.com")
    const element2 = screen.getByText("likes: 20")
    expect(element).toBeDefined()
    expect(element2).toBeDefined()
})

test("like button is clicked twice", async () => {
    const blog = {
        title: "front test",
        author: "tester",
        url: "www.test.com",
        likes: 20
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)
    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
})