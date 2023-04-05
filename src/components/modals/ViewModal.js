import React from "react";

function ViewModal({ getProduct, setViewModal, viewModal }) {
  return (
    <>
      {viewModal && getProduct ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b-2 border-solid border-gray-700 rounded-t">
                  <h3 className="text-xl font-semibold">
                    ID: {getProduct.id} Purchased Products
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  {Object.keys(getProduct.attributes["product-data"]).map(
                    (key, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b-2 border-gray-500"
                      >
                        <p>{key}</p>
                        <p>{getProduct.attributes["product-data"][key]}</p>
                      </div>
                    )
                  )}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setViewModal(false)}
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

export default ViewModal;
