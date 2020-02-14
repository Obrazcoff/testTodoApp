import { BASE_URL } from '@env'
import init from 'startupjs/init'
import orm from './model'
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { observer, useDoc, useApi } from 'startupjs'
import axios from 'axios'
import './Root.styl'
import {
  Increment,
  SearchPanel,
  ItemStatusFilter,
  TodoList
} from './components'

// Init startupjs connection to server and the ORM.
// baseUrl option is required for the native to work - it's used
// to init the websocket connection and axios.
// Initialization must start before doing any subscribes to data.
init({ baseUrl: BASE_URL, orm })

// eslint-disable-next-line
export default observer(function Root() {
  let [counter, $counter] = useDoc('counters', 'first')
  if (!counter) throw $counter.addSelf() // custom ORM method (see /model/)

  let [stateCounter, setStateCounter] = useState(0)

  let [todosList, setTodosList] = useState([
    { id: 1, label: 'Read documentation', important: false, done: false },
    { id: 2, label: 'Drink Coffee', important: true, done: false },
    { id: 3, label: 'Make Todo App', important: false, done: false }
  ])

  let [filter, setFilter] = useState('all')
  let [search, setSearch] = useState('')

  let forceTrigger = useForceTrigger(3000)
  let [api] = useApi(getApi, [forceTrigger])

  // eslint-disable-next-line
  async function decrement() {
    $counter.increment('value', -1)
    setStateCounter(stateCounter - 1)
  }

  // eslint-disable-next-line
  async function reset() {
    $counter.reset() // custom ORM method (see /model/)
    setStateCounter(0)
  }

  // eslint-disable-next-line
  async function onSearchChange(search) {
    setSearch(search)
  }

  // eslint-disable-next-line
  async function onFilterChange(filter) {
    setFilter(filter)
  }

  // eslint-disable-next-line
  async function onToggleDone(id) {
    setTodosList(() => {
      const items = this.toggleProperty(todosList, id, 'done')
      return { items }
    })
  }

  // eslint-disable-next-line
  async function onToggleImportant(id) {
    setTodosList(() => {
      const items = this.toggleProperty(todosList, id, 'important')
      return { items }
    })
  }

  // eslint-disable-next-line
  async function onDelete(id) {
    setTodosList(() => {
      const idx = todosList.findIndex((item) => item.id === id)
      const items = [...todosList.slice(0, idx), ...todosList.slice(idx + 1)]
      return { items }
    })
  }

  // eslint-disable-next-line
  async function filterItems(items, filter) {
    if (filter === 'all') {
      return items
    } else if (filter === 'active') {
      return items.filter((item) => !item.done)
    } else if (filter === 'done') {
      return items.filter((item) => item.done)
    }
  }

  // eslint-disable-next-line
  async function searchItems(items, search) {
    if (search.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
  }

  const visibleItems = searchItems(filterItems(todosList, filter), search)

  return pug`
    View.body
      Text.greeting Counter
      Text DB Counter: #{counter && counter.value}
      Text State Counter: #{stateCounter}
      Increment(stateCounter=stateCounter setStateCounter=setStateCounter)
      TouchableOpacity.button.decrement(onPress=decrement)
        Text.label -
      TouchableOpacity.button.clear(onPress=reset)
        Text.label RESET
      Text.api /api (updated each 3 sec): #{JSON.stringify(api)}
    View.body
      Text.greeting Todo List
      SearchPanel(onSearchChange=onSearchChange)
      ItemStatusFilter(filter=filter onFilterChange=onFilterChange)
      TodoList(items=visibleItems onToggleImportant=onToggleImportant onToggleDone=onToggleDone onDelete=onDelete)
  `
})

// eslint-disable-next-line
async function getApi() {
  try {
    let res = await axios.get('/api')
    if (res.status !== 200 || !res.data) {
      throw new Error('No data. Status: ' + res.status)
    }
    return res.data
  } catch (err) {
    return err.message
  }
}

// Custom hook. A way to rerun something each `delay` ms.
// WARNING! This is for demo purposes only. Don't use this trick
// in production since the useApi data is not getting cleaned up.
// eslint-disable-next-line
function useForceTrigger(delay = 3000) {
  let [forceTrigger, setForceTrigger] = useState(0)
  useEffect(() => {
    let timer = setTimeout(() => {
      setForceTrigger(forceTrigger + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [forceTrigger])
  return forceTrigger
}
