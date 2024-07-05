import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Supplier = () => {
  const [supplier, setsupplier] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/Read")
      .then((resp) => resp.json())
      .then((results) => {
        console.log(results);
        setsupplier(results || []);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ minHeight: "100vh", backgroundColor: "#0D1117" }}>
        <div className="main-div-1">
          <br />
          <h1
            className="main-2-text"
            style={{ paddingLeft: "0px", paddingTop: "20px" }}>
            List Of Supplier
          </h1>
          <br />
          <br />
          <table className="table  table-striped-columns" data-aos="zoom-in-up">
            <thead>
              <tr>
                <th scope="col" className="product-main-1">
                  Id
                </th>
                <th scope="col" className="product-main-1">
                  Supplier Name
                </th>
                <th scope="col" className="product-main-1">
                  Company
                </th>
                <th scope="col" className="product-main-1">
                  Email
                </th>
                <th scope="col" className="product-main-1">
                  Phone Number
                </th>
                <th scope="col" className="product-main-1">
                  Status
                </th>
              </tr>
            </thead>
            {supplier.map((product) => (
              <tbody>
                <tr>
                  <th scope="row" className="product-main">
                    {product.id}
                  </th>
                  <td style={{ textAlign: "center" }}>{product.Name}</td>
                  <td className="product-main">{product.Company}</td>
                  <td style={{ textAlign: "center" }}>{product.email}</td>
                  <td className="product-main">{product.phone}</td>
                  <td style={{ textAlign: "center" }}>Active</td>
                </tr>
              </tbody>
            ))}
          </table>
          <br />
        </div>
      </div>
    </>
  );
};

export default Supplier;
