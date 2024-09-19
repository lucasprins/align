import { makeObservable, observable, action, computed } from 'mobx'

export class Todo {
  id: number = Math.random()
  title: string = ''
  finished: boolean = false

  constructor(title: string) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action,
    })
    this.title = title
  }

  toggle() {
    this.finished = !this.finished
  }
}

export class TodoList {
  todos: Todo[] = []

  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length
  }

  constructor(todos: Todo[]) {
    makeObservable(this, {
      todos: observable,
      unfinishedTodoCount: computed,
    })
    this.todos = todos
  }
}
