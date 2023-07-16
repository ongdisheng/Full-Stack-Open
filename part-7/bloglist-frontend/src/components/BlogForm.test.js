import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('create a blog with correct details', async () => {
  // setup user event and mock function
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)
  const inputTitle = screen.getByPlaceholderText('enter blog title')
  const inputAuthor = screen.getByPlaceholderText('enter blog author')
  const inputUrl = screen.getByPlaceholderText('enter blog url')
  const createButton = screen.getByText('create')

  // simulate typing on textbox
  await user.type(inputTitle, 'Blockchain Developer Roadmap')
  await user.type(inputAuthor, 'Mary Jane')
  await user.type(inputUrl, 'https://roadmap.sh/blockchain')
  await user.click(createButton)

  expect(createBlog.mock.calls[0][0].title).toBe('Blockchain Developer Roadmap')
  expect(createBlog.mock.calls[0][0].author).toBe('Mary Jane')
  expect(createBlog.mock.calls[0][0].url).toBe('https://roadmap.sh/blockchain')
})
