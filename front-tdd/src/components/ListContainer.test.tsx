import React from 'react'

import { useSelector } from 'react-redux'

import { render } from '@testing-library/react'

import ListContainer from './ListContainer'

import { tasks } from '../../fixtures/tasks'

jest.mock('react-redux')

describe('ListContainer', () => {
  (useSelector as jest.Mock<any>).mockImplementation((selector) => selector({
    tasks
  }))

  it('render tasks', () => {
    const { container } = render((
      <ListContainer/>
    ))

    expect(container).toHaveTextContent('아무 일도 하기 싫다')
    expect(container).toHaveTextContent('건물 매입')
  })
})
