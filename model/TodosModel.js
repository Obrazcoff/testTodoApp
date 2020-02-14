import { BaseModel } from 'startupjs/orm'

export default class TodosModel extends BaseModel {
  async addNewTask({ id, label }) {
    await this.root.addAsync(this.getCollection(), {
      id,
      label,
      important: false,
      done: false
    })
  }

  async setDone({ id }) {
    await this.setAsync('done', true)
  }

  async setImportant({ id }) {
    await this.setAsync('important', true)
  }
}
