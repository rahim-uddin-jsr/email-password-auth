import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Components/Layout/Main';
import Login from './Components/Login/Login';
import Regester from './Components/Regester/Regester';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        { path: '/', element: < Regester /> },
        { path: '/register', element: <Regester /> },
        { path: '/login', element: <Login /> },
      ]

    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
