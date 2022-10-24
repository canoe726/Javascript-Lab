import React from 'react'
import { useSelector } from 'react-redux'
import List from './List'
// import { IListItemInfo } from './List.type'

const ListContainer = () => {
  const { tasks } = useSelector<any>((state) => ({
    tasks: state.tasks
  }))
  console.log(tasks)

  return (
    <List tasks={tasks} />
  )
}

export default ListContainer
