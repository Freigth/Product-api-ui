import React from "react";

function Delete({ setDeleteModal, setProduct, purchasedProduct }) {
  return (
    <button
      className="bg-red-500 text-white hover:bg-red-800 font-bold text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      onClick={() => (setDeleteModal(true), setProduct(purchasedProduct))}
    >
      Delete
    </button>
  );
}

export default Delete;
