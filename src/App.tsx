import TodoList from './components/ui/TodoList'
import { ThemeProvider } from './components/ui/theme-provider'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <TodoList />
      </ThemeProvider>
    </>
  )
}

export default App
