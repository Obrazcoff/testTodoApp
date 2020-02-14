import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { observer, useModel } from 'startupjs'
import './search-panel.styl'

export default observer(function SearchPanel({ onSearchChange }) {
  const [term, setTerm] = useState('')

  function onTermChange(e) {
    setTerm(e.target.value)
    onSearchChange(e.target.value)
  }

  return (
    <TextInput
      type='text'
      className='form-control search-input'
      placeholder='type to search'
      value={term}
      onChange={onTermChange}
    />
  )
})
