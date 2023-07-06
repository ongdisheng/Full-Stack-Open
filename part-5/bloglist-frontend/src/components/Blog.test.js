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
      name: 'Harry Kane'
    }
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

test('render url and likes after button click', async () => {
  // setup user event
  const user = userEvent.setup()

  // simulate button click
  const { container } = render(<Blog blog={blog} user={user} />)
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('https://roadmap.sh/blockchain')
  expect(div).toHaveTextContent('60')
})