import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { observer } from 'startupjs'
import './item-status-filter.styl'

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'done', label: 'Done' }
]

// eslint-disable-next-line
export default observer(function ItemStatusFilter({
  filter,
  onFilterChange = () => {}
}) {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter
    const classNames =
      'btn ' + (isActive ? 'btn-info' : 'btn-outline-secondary')

    return (
      <TouchableOpacity
        key={name}
        type='button'
        onClick={() => onFilterChange(name)}
        className={classNames}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    )
  })

  return <View className='btn-group'>{buttons}</View>
})
