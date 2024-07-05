import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Changed Switch to Routes
import Index from './components/Index';
import Supplier from './components/Supplier';
import MyComponent from './components/Product';
import AddProduct from './components/AddProduct';
import AddSupplier from './components/AddSupplier';
import Client from './components/Client';
import DisplayClient from './components/DisplayClient';

function App() {

  return (
    <>
    
      <Router>

        <Routes>
        <Route path="/" element={ <Home />}/>
        <Route path="/index" element={ <Index  /> }  />
          <Route path='/product' element= {<MyComponent  /> } />
          <Route path='/supplier' element= {<Supplier  /> } />
          <Route path='/addproduct' element= {<AddProduct  /> } />
          <Route path='/AddSupplier' element= {<AddSupplier  /> } />
          <Route path='/Client' element= {<Client  /> } />
          <Route path='/DisplayClient' element= {<DisplayClient  /> } />

        </Routes>

      </Router>
    </>
  );
}

export default App;
