import React from 'react'
import { render } from '@testing-library/react'

import List from './List'

import { tasks } from '../../fixtures/tasks'

describe('List', () => {
  it('render tasks', () => {
    const { container } = render((
      <List
        tasks={tasks}
      />
    ))

    expect(container).toHaveTextContent('아무 일도 하기 싫다')
    expect(container).toHaveTextContent('건물 매입')
  })
})
