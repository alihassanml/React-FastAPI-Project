import { useState } from "react";
import Navbar from "./Navbar";

const AddProduct = () => {



  const [product, setProduct] = useState({
    ProductName: "",
    Quantity: "",
    soldOut: "", // Kept as string for input
    Price: "",
    supplier: ""
  });

  const updateForm = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    console.log(product);
    const url = `http://127.0.0.1:8000/product_add/?supplier_id=${product.supplier}`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name: product.ProductName,
        Sold_Out: parseFloat(product.soldOut), // Convert to float
        Total_Quantity: parseFloat(product.Quantity), // Convert to float
        Price: parseFloat(product.Price) // Convert to float
      })
    });

    const responseData = await response.json();
    if (responseData.message === "Product Successfully Added") {
      alert("Product added successfully");
    } else {
      alert("Failed to add product");
    }
    setProduct({
      ProductName: "",
      Quantity: "",
      soldOut: "",
      Price: "",
      supplier: ""
    });
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#0D1117",
          display: "grid",
          minHeight: "100vh"
        }}
      >
        <form data-aos="fade-up"
          onSubmit={postData}
          className="container mt-5"
          style={{ width: "800px", backgroundColor: "#d3d3d312" }}
        >
          <center>
            <h1 className="container mt-5">Add Product</h1>
          </center>
          <div className="mb-3">
            <label className="form-label mt-3 ms-4">Supplier Id</label>
            <input
              style={{
                backgroundColor: "#55555517",
                width: "90%",
                color: "white"
              }}
              name="supplier"
              value={product.supplier}
              onChange={updateForm}
              type="text"
              className="form-control ms-4"
            />
          </div>

          <div className="mb-3">
            <label className="form-label ms-4">Product Name</label>
            <input
              style={{
                backgroundColor: "#55555517",
                width: "90%",
                color: "white"
              }}
              name="ProductName"
              value={product.ProductName}
              onChange={updateForm}
              type="text"
              className="form-control ms-4"
            />
          </div>

          <div className="mb-3">
            <label className="form-label ms-4">Sold Out</label>
            <input
              style={{
                backgroundColor: "#55555517",
                width: "90%",
                color: "white"
              }}
              name="soldOut"
              value={product.soldOut}
              onChange={updateForm}
              type="number" // Use number type for integer input
              className="form-control ms-4"
            />
          </div>

          <div className="mb-3">
            <label className="form-label ms-4">Total Quantity</label>
            <input
              style={{
                backgroundColor: "#55555517",
                width: "90%",
                color: "white"
              }}
              name="Quantity"
              value={product.Quantity}
              onChange={updateForm}
              type="number" // Use number type for integer input
              className="form-control ms-4"
            />
          </div>

          <div className="mb-3">
            <label className="form-label ms-4">Price</label>
            <input
              style={{
                backgroundColor: "#55555517",
                width: "90%",
                color: "white"
              }}
              name="Price"
              value={product.Price}
              onChange={updateForm}
              type="number" // Use number type for float input
              step="0.01" // Allow decimal input
              className="form-control ms-4"
            />
          </div>

          <button
            type="submit"
            className="btn ms-4 btn-primary"
            style={{ width: "150px" }}
            
          >
            Add Product
          </button>
          <br />
          <br />
          <br />
        </form>
        <br />
      </div>
    </>
  );
};

export default AddProduct;
