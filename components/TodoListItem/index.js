import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { observer } from 'startupjs'

import './todo-list-item.styl'

// eslint-disable-next-line
export default observer(function TodoListItem({
  important,
  done,
  label,
  onToggleImportant,
  onToggleDone,
  onDelete
}) {
  let classNames = 'todo-list-item'

  if (important) {
    classNames += ' important'
  }

  if (done) {
    classNames += ' done'
  }

  return (
    <Text className={classNames}>
      <Text className='todo-list-item-label' onClick={onToggleDone}>
        {label}
      </Text>

      <TouchableOpacity
        type='button'
        className='btn btn-outline-success btn-sm float-right'
        onClick={onToggleImportant}
      >
        <Text className='fa fa-exclamation' />
      </TouchableOpacity>

      <TouchableOpacity
        type='button'
        className='btn btn-outline-danger btn-sm float-right'
        onClick={onDelete}
      >
        <Text className='fa fa-trash-o' />
      </TouchableOpacity>
    </Text>
  )
})
