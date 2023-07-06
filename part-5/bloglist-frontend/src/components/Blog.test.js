import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('render title and author only by default', () => {
  // define hardcoded blog
  const blog = {
    title: 'Blockchain Developer Roadmap',
    author: 'Mary Jane',
    url: 'https://roadmap.sh/blockchain',
    likes: 60
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Blockchain Developer Roadmap')
  expect(div).toHaveTextContent('Mary Jane')
  expect(div).not.toHaveTextContent('https://roadmap.sh/blockchain')
  expect(div).not.toHaveTextContent('60')
})