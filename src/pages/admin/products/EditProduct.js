import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// export default function CreateProduct() {
export default function EditProduct() {
  const params = useParams();
  const [initialData, setInitailData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const navi = useNavigate();

  function getProduct() {
    fetch("http://localhost:4000/products/" + params.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setInitailData(data);
      })
      .catch((error) => {
        alert("Unalbe to read the product details");
      });
  }

  useEffect(getProduct, []);

  //   useEffect(() => {
  //     getProduct();
  //   }, [params.id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData.entries());

    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price ||
      !product.description
    ) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/products/" + params.id,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        navi("/admin/products");
      } else if (response.status === 400) {
        setValidationErrors(data);
      } else {
        alert("Unable to update the product!");
      }
    } catch (error) {
      alert("Unable to connect to the server!");
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit Product</h2>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">ID</label>
            <div className="col-sm-8">
              <input
                readOnly
                className="form-control-plaintext"
                defaultValue={params.id}
              />
            </div>
          </div>
          {initialData && (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="name"
                    defaultValue={initialData.name}
                  />
                  <span className="text-danger">{validationErrors.name}</span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Brand</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="brand"
                    defaultValue={initialData.brand}
                  />
                  <span className="text-danger">{validationErrors.brand}</span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Category</label>
                <div className="col-sm-8">
                  <select
                    className="form-select"
                    name="category"
                    defaultValue={initialData.category}
                  >
                    <option value="Other">Other</option>
                    <option value="Phones">Phones</option>
                    <option value="Computers">Computers</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Printers">Printers</option>
                    <option value="Cameras">Cameras</option>
                  </select>
                  <span className="text-danger">
                    {validationErrors.category}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Price</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="price"
                    type="number"
                    step="0.01"
                    min="1"
                    defaultValue={initialData.price}
                  />
                  <span className="text-danger">{validationErrors.price}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    defaultValue={initialData.description}
                  />
                  <span className="text-danger">
                    {validationErrors.description}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="offset-sm-4 col-sm-8">
                  <img
                    src={
                      "http://localhost:4000/images/" +
                      initialData.imageFilename
                    }
                    width="150"
                    alt="..."
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Image</label>
                <div className="col-sm-8">
                  <input className="form-control" name="image" type="file" />
                  <span className="text-danger">{validationErrors.image}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Created At</label>
                <div className="col-sm-8">
                  <input
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={
                      initialData.createdAt
                        ? initialData.createdAt.slice(0, 10)
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="row">
                <div className="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>

                <div className="col-sm-4 d-grid">
                  <Link
                    className="btn btn-secondary"
                    to="/admin/products"
                    role="button"
                  >
                    Cancle
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
