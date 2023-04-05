import React, { useState } from "react";
import View from "./View";
import ViewModal from "./modals/ViewModal";
import DeleteModal from "./modals/DeleteModal";
import EditModal from "./modals/EditModal";

function Table({ purchasedProducts, setPurchasedProducts }) {
  const [viewModal, setViewModal] = useState(false);
  const [getProduct, setProduct] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [productData, setProductData] = useState({});

  return (
    <>
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Product Data
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {purchasedProducts.map((purchasedProduct) => (
            <View
              key={purchasedProduct.id}
              purchasedProduct={purchasedProduct}
              setViewModal={setViewModal}
              setProduct={setProduct}
              setDeleteModal={setDeleteModal}
              setEditModal={setEditModal}
              setProductData={setProductData}
            />
          ))}
        </tbody>
      </table>

      {/* VIEW MODAL */}
      <ViewModal
        getProduct={getProduct}
        setViewModal={setViewModal}
        viewModal={viewModal}
        productData={productData}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        deleteModal={deleteModal}
        getProduct={getProduct}
        setDeleteModal={setDeleteModal}
        purchasedProducts={purchasedProducts}
        setPurchasedProducts={setPurchasedProducts}
      />

      {/* EDIT MODAL */}
      <EditModal
        getProduct={getProduct}
        setPurchasedProducts={setPurchasedProducts}
        purchasedProducts={purchasedProducts}
        editModal={editModal}
        setEditModal={setEditModal}
        productData={productData}
        setProductData={setProductData}
      />
    </>
  );
}

export default Table;
