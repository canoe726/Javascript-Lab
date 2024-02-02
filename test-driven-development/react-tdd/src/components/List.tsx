import React from 'react'
import { IListItemInfo } from './List.type'

const List = ({
  tasks
}: {
  tasks: IListItemInfo[]
}) => {
  return (
    <ul>
      {tasks.map(({ key, title }) => {
        return (<li key={key}>{title}</li>)
      })}
    </ul>
  )
}

export default List
