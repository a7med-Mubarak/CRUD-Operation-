import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import CreateACC from './Components/CreateACC/CreateACC';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import EditUser from './Components/EditUser/EDitUser';


let routers = createBrowserRouter([
  {path:'/' , element:<Layout/> , children:[
    {index:true , element:<Home/>},
    {path:'CreateACC' , element:<CreateACC/>},
    {path:"EditUser/:id" , element:<EditUser/>},
    {path:'*' , element:<NotFound/>}
  ]}
])

function App() {
  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
