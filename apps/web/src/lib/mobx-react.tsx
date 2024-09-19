import { createContext, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Todo, TodoList } from './mobx'

const TodoListView = observer(() => {
  const todoList = useTodoList()

  return (
    <div>
      <ul>
        {todoList.todos.map((todo) => (
          <TodoView todo={todo} key={todo.id} />
        ))}
      </ul>
      Tasks left: {todoList.unfinishedTodoCount}
    </div>
  )
})

const TodoView = observer(({ todo }: { todo: Todo }) => (
  <li>
    <input type="checkbox" checked={todo.finished} onChange={() => todo.toggle()} />
    {todo.title}
  </li>
))

const store = new TodoList([new Todo('Get Coffee'), new Todo('Write simpler code')])

const TodoContext = createContext<TodoList | null>(null)

const TodoProvider = () => {
  return (
    <TodoContext.Provider value={store}>
      <TodoListView />
    </TodoContext.Provider>
  )
}

const useTodoList = () => {
  const todoList = useContext(TodoContext)
  if (!todoList) throw new Error('Can only use useTodoList from within a TodoProvider')
  return todoList
}

export { TodoProvider, store, TodoListView, TodoView }
