import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

const MyComponent = () => {
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    fetch("http://127.0.0.1:8000/Product/")
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
                <th scope="col" className="product-main-1" >Product Name</th>
                <th scope="col" className="product-main-1" >Sold Out</th>
                <th scope="col" className="product-main-1" >One Unit Price</th>
                <th scope="col" className="product-main-1" >Remaning</th>
                <th scope="col" className="product-main-1" >Revenue</th>
                <th scope="col" className="product-main-1" >Total Quantity</th>
                <th scope="col" className="product-main-1" >Action</th>
              </tr>
            </thead>
            {products.map((product) => (
            <tbody>
              <tr>
                <th scope="row" className="product-main">{product.id}</th>
                <td style={{textAlign:'center'}}>{product.name}</td>
                <td className="product-main">{product.Sold_Out}</td>
                <td style={{textAlign:'center'}}>{product.Price}</td>
                <td className="product-main">{product.remaning}</td>
                <td style={{textAlign:'center'}}>{product.revnue}</td>
                <td className="product-main">{product.Total_Quantity}</td>
                <td style={{textAlign:'center'}}>{product.Supplier_id}</td>
              </tr>
            </tbody>
            ))}
          </table>
          </div>
    </>
  );
};

export default MyComponent;
