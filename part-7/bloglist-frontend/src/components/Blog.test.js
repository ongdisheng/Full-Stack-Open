import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let blog = null
beforeEach(() => {
  // define hardcoded blog
  blog = {
    title: 'Blockchain Developer Roadmap',
    author: 'Mary Jane',
    url: 'https://roadmap.sh/blockchain',
    likes: 60,
    user: {
      username: 'harry',
      name: 'Harry Kane',
    },
  }
})

test('render title and author only by default', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Blockchain Developer Roadmap')
  expect(div).toHaveTextContent('Mary Jane')
  expect(div).not.toHaveTextContent('https://roadmap.sh/blockchain')
  expect(div).not.toHaveTextContent('60')
})

test('render url and likes after `view` button click', async () => {
  // setup user event
  const user = userEvent.setup()

  // simulate view button click
  const { container } = render(<Blog blog={blog} user={user} />)
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('https://roadmap.sh/blockchain')
  expect(div).toHaveTextContent('60')
})

test('click `like` button twice', async () => {
  // setup user event and mock function
  const user = userEvent.setup()
  const handleLike = jest.fn()

  // simulate view button click
  render(<Blog blog={blog} user={user} handleLike={handleLike} />)
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // simulate like button click
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(handleLike.mock.calls).toHaveLength(2)
})
