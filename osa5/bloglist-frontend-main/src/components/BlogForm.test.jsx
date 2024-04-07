import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test("props are passed correctly", async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const openButton = screen.getByText("new blog")
    await user.click(openButton)

    const title = screen.getByPlaceholderText("Title of the blog")
    const author = screen.getByPlaceholderText("Author of the blog")
    const url = screen.getByPlaceholderText("URL of the blog")
    const button = screen.getByText("create")

    await user.type(title, "test")
    await user.type(author, "tester")
    await user.type(url, "www.test.com")
    await user.click(button)

    expect(createBlog.mock.calls[0][0].title).toBe("test")
    expect(createBlog.mock.calls[0][0].author).toBe("tester")
    expect(createBlog.mock.calls[0][0].url).toBe("www.test.com")
})