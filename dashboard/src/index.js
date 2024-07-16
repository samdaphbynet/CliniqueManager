import React, {useState, createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

export const Context = createContext({isAuthenticated: false})

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(false)

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      <App />
    </Context.Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <AppWrapper />
  </React.StrictMode>
);