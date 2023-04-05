import React from "react";

function Edit({ setProduct, purchasedProduct, setEditModal, setProductData }) {
  function handleClick() {
    const productHash = purchasedProduct.attributes["product-data"];
    delete productHash["fbvga"];
    setEditModal(true);
    setProduct(purchasedProduct);
    setProductData({ ...productHash });
  }

  return (
    <button
      className="bg-blue-500 text-white hover:bg-blue-800 font-bold text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      onClick={handleClick}
    >
      Edit
    </button>
  );
}

export default Edit;
