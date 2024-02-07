import React from 'react'

import { render } from '@testing-library/react'

import { useSelector } from 'react-redux'

import App from './App'
import { tasks } from '../fixtures/tasks'

jest.mock('react-redux')
describe('App', () => {
  (useSelector as jest.Mock<any>).mockImplementation((selector) => selector({
    tasks
  }))

  it('render tasks', () => {
    const { container } = render((
      <App/>
    ))
    expect(container).toHaveTextContent('아무 일도 하기 싫다')
  })
})
