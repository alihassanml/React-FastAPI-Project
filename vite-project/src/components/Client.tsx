import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import  Navbar  from "./Navbar";


const Client = () => {
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    fetch("http://127.0.0.1:8000/Read/Client")
      .then((resp) => resp.json())
      .then((results) => {
        console.log(results);
        setProducts(results || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // The empty dependency array ensures this runs only once
  return (
    <>
        <div className="main-div-1" data-aos="zoom-in-up">
          <table className="table  table-striped-columns" >
            <thead >
              <tr >
                <th scope="col" className="product-main-1" >Id</th>
                <th scope="col" className="product-main-1" >Client Name</th>
                <th scope="col" className="product-main-1" >Phone</th>
                <th scope="col" className="product-main-1" >Email</th>
                <th scope="col" className="product-main-1" >Product Name</th>
                <th scope="col" className="product-main-1" >IS Supplier</th>
                <th scope="col" className="product-main-1" >Action</th>
              </tr>
            </thead>
            {products.map((product) => (
            <tbody>
              <tr>
                <th scope="row" className="product-main">{product.id}</th>
                <td style={{textAlign:'center'}}>{product.name}</td>
                <td className="product-main">{product.phone}</td>
                <td style={{textAlign:'center'}}>{product.email}</td>
                <td style={{textAlign:'center'}}>{product.Product_Name}</td>
                <td className="product-main">{product.Product_Id === 1 ? 'Yes' : 'No'}</td>
                <td className="product-main">{product.Product_Id}</td>
              </tr>
            </tbody>
            ))}
          </table>
          </div>
    </>
  );
};

export default Client;
