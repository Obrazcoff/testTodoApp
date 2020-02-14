import Counter from './CounterModel'
import TodosModel from './TodosModel'

export default function(racer) {
  racer.orm('counters.*', Counter)
}
