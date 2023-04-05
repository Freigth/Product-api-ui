import React from "react";
import Delete from "./Delete";
import Edit from "./Edit";

function View({
  purchasedProduct,
  setViewModal,
  setProduct,
  setDeleteModal,
  setEditModal,
  setProductData,
}) {
  return (
    <>
      <tr className="bg-white border-b bg-gray-800 border-gray-700">
        <td className="px-6 py-4">{purchasedProduct.id}</td>
        <td className="px-6 py-4">
          <button
            className="bg-blue-500 text-white hover:bg-blue-800 font-bold text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              setViewModal(true);
              setProduct(purchasedProduct);
            }}
          >
            View All Purchased Products
          </button>
        </td>
        <td className="px-6 py-4">
          {purchasedProduct.attributes["original-price"]}
        </td>
        <td className="px-6 py-4">
          <Edit
            setProduct={setProduct}
            purchasedProduct={purchasedProduct}
            setEditModal={setEditModal}
            setProductData={setProductData}
          />
        </td>
        <td className="px-6 py-4">
          <Delete
            setDeleteModal={setDeleteModal}
            setProduct={setProduct}
            purchasedProduct={purchasedProduct}
          />
        </td>
      </tr>
    </>
  );
}

export default View;
