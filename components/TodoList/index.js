import React from 'react'
import { observer } from 'startupjs'
import { FlatList, Text } from 'react-native'
import TodoListItem from '../TodoListItem'

import './todo-list.styl'

// eslint-disable-next-line
export default observer(function TodoList({
  items,
  onToggleImportant,
  onToggleDone,
  onDelete
}) {
  const elements = items.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Text key={id} className='list-group-item'>
        <TodoListItem
          {...itemProps}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          onDelete={() => onDelete(id)}
        />
      </Text>
    )
  })

  return <FlatList data={elements} className='todo-list list-group' />
})
