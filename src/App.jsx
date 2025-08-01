import { BrowserRouter, Routes, Route } from "react-router-dom"
import Tras from "./pages/Tras"  
import Landing from "./pages/Landing"  
    export default function App(){
    
      return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/traslate" element={<Tras />}></Route>
          </Routes>
        </BrowserRouter>
      )
      
    } 
    