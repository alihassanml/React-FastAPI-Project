import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddSupplier = () => {

    useEffect(() => {
        AOS.init({ duration: 3000 });
    }, []);

    const [supplier, setSupplier] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        is_active: true
    });

    const updateForm = (e) => {
        const { name, value, type, checked } = e.target;
        setSupplier((prevSupplier) => ({
            ...prevSupplier,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const postData = async (e) => {
        e.preventDefault();
        console.log("Sending supplier data: ", supplier);

        try {
            const url = "http://127.0.0.1:8000/supplier";
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
                body: JSON.stringify(supplier)
            });

            const responseData = await response.json();
            console.log("Response data: ", responseData);

            if (responseData.Data === "Successfully Added") {
                alert("Supplier added successfully");
            } else {
                alert("Failed to add supplier");
            }
        } catch (error) {
            console.error("Error adding supplier: ", error);
            alert("Failed to add supplier due to network or server error");
        }

        setSupplier({
            name: "",
            email: "",
            company: "",
            phone: "",
            is_active: true
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
                        <h1 className="container mt-5">Add Supplier</h1>
                    </center>
                    <div className="mb-3">
                        <label className="form-label mt-3 ms-4">Supplier Name</label>
                        <input
                            style={{
                                backgroundColor: "#55555517",
                                width: "90%",
                                color: "white"
                            }}
                            name="name"
                            value={supplier.name}
                            onChange={updateForm}
                            type="text"
                            className="form-control ms-4"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label ms-4">Email</label>
                        <input
                            style={{
                                backgroundColor: "#55555517",
                                width: "90%",
                                color: "white"
                            }}
                            name="email"
                            value={supplier.email}
                            onChange={updateForm}
                            type="email"
                            className="form-control ms-4"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label ms-4">Company</label>
                        <input
                            style={{
                                backgroundColor: "#55555517",
                                width: "90%",
                                color: "white"
                            }}
                            name="company"
                            value={supplier.company}
                            onChange={updateForm}
                            type="text"
                            className="form-control ms-4"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label ms-4">Phone</label>
                        <input maxLength={11}
                            style={{
                                backgroundColor: "#55555517",
                                width: "90%",
                                color: "white"
                            }}
                            name="phone"
                            value={supplier.phone}
                            onChange={updateForm}
                            type="text"
                            className="form-control ms-4"
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input ms-1"
                            name="is_active"
                            checked={supplier.is_active}
                            onChange={updateForm}
                        />
                        <label className="form-check-label ms-2">Is Active</label>
                    </div>

                    <button
                        type="submit"
                        className="btn ms-4 btn-primary"
                        style={{ width: "150px" }}
                    >
                        Add Supplier
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

export default AddSupplier;
