import React, {useState, createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


export const Context = createContext({isAuthenticated: false})

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const baseUrl = import.meta.env.VITE_BACKEND_API_RENDER

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser, baseUrl}}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AppWrapper />
  </React.StrictMode>,
)
