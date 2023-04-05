import { useState, useRef } from "react";
import Loading from "../Loading";
import axios from "axios";

function EditModal({
  getProduct,
  setPurchasedProducts,
  purchasedProducts,
  productData,
  setProductData,
  editModal,
  setEditModal,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const productRef = useRef();
  const quantityRef = useRef();

  function addProducts() {
    if (productRef.current.value === "" || quantityRef.current.value === "") {
      setError(true);
    } else {
      let productSku = productRef.current.value;
      let productQuantity = quantityRef.current.value;
      setProductData((prev) => {
        return {
          ...prev,
          [productSku]: productQuantity,
        };
      });
      quantityRef.current.value = "";
    }
  }

  function editPurchasedHistory(id) {
    setIsLoading(true);
    let URL = `http://localhost:3000/api/v1/purchased-histories/${id}`;
    let data = {
      data: {
        attributes: {
          product_data: productData,
        },
      },
    };
    axios
      .patch(URL, data)
      .then((response) => {
        console.log(response);
        let updatedProducts = purchasedProducts.map((prod) => {
          if (prod.id === String(id)) {
            return { ...prod, ...response.data.data };
          }

          return prod;
        });

        setPurchasedProducts(updatedProducts);
        setIsLoading(false);
        setEditModal(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <>
      {editModal && getProduct ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b-2 border-solid border-gray-700 rounded-t">
                  <h3 className="text-xl text-red-500 font-semibold">
                    Edit ID: {getProduct.id} Purchased Products?
                  </h3>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <div className="relative p-6 flex-auto">
                    <form className="w-full max-w-lg">
                      <div className="w-full justify-between px-3 mb-4 md:w-3/3 flex flex-wrap">
                        {productData
                          ? Object.keys(productData).map((key, index) => (
                              <button
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full"
                                key={index}
                                type="button"
                              >
                                {key}: {productData[key]}
                              </button>
                            ))
                          : null}
                      </div>
                      <div className="w-full md:w-3/3 px-3 mb-6 flex flex-wrap mb-2">
                        <div className="">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-state"
                          >
                            Choose Product
                          </label>
                          <div className="relative">
                            <select
                              className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                              ref={productRef}
                            >
                              <option value="">Select an option</option>
                              <option value="atv">Apple TV</option>
                              <option value="ipd">Super iPad</option>
                              <option value="mbp">MacBook Pro</option>
                              <option value="vga">VGA Adapter</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="ml-2">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            Quantity
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Quantity"
                            ref={quantityRef}
                            onChange={() => setError(false)}
                          />
                          {error && (
                            <p className="text-red-500 text-xs italic">
                              Please fill out this field.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="bg-green-500 text-white hover:bg-green-800 font-bold text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={addProducts}
                        >
                          Change Quantity or Add Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {Object.keys(productData).length !== 0 && (
                    <button
                      className="bg-green-500 text-white hover:bg-green-800 font-bold text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => editPurchasedHistory(getProduct.id)}
                    >
                      {isLoading ? <Loading /> : <>Update Purchased Product</>}
                    </button>
                  )}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setEditModal(false);
                      setProductData({});
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default EditModal;
