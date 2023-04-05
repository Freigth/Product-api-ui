import { useState } from "react";
import Loading from "../Loading";
import axios from "axios";

function DeleteModal({
  deleteModal,
  getProduct,
  setDeleteModal,
  purchasedProducts,
  setPurchasedProducts,
}) {
  const [isLoading, setIsLoading] = useState(false);
  function deletePurchasedHistory(id) {
    setIsLoading(true);
    let URL = `http://localhost:3000/api/v1/purchased-histories/${id}`;
    axios
      .delete(URL)
      .then(() => {
        let filteredProducts = purchasedProducts.filter(
          (prod) => prod.id !== String(id)
        );
        setPurchasedProducts(filteredProducts);
        setDeleteModal(false);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {deleteModal && getProduct ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b-2 border-solid border-gray-700 rounded-t">
                  <h3 className="text-xl text-red-500 font-semibold">
                    Destroy ID: {getProduct.id} Purchased Products?
                  </h3>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white hover:bg-red-800 font-bold text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deletePurchasedHistory(getProduct.id)}
                  >
                    {isLoading ? <Loading /> : <>Are you sure?</>}
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setDeleteModal(false)}
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

export default DeleteModal;
