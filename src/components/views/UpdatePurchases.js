import React from "react";
import { useForm } from "react-hook-form";
import { handlePurchaseEdit } from "../utils"
import { BsX } from "react-icons/bs";

function UpdatePurchases({ setModalIsOpen, editPurchase }) {
  const { register, handleSubmit,errors } = useForm();
 
  return (
    <>
      <div className="w-full lg:w-1/2 -ml-24 lg:ml-48 -mt-96 relative">
       
        <form
          onSubmit={handleSubmit(handlePurchaseEdit)}
          className="w-full max-w-lg bg-gray-100 p-10 shadow-2xl rounded-md ml-24"
        >
          <div className="">
            <BsX
              onClick={() => setModalIsOpen(false)}
              className="mb-3 text-2xl cursor-pointer font-bold ml-auto"
            />
            
          </div>
          <input type="text" value={editPurchase[0]} name="id" ref={register} />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Purchase Name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none  pl-4 pr-3 py-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Purchase name"
                defaultValue={editPurchase[1]}
                name="p_name"
                ref={register({
                  required: "Purchase name is required"
                })}
              />
              <p className="text-red-500 text-sm">{errors.p_name?.message}</p>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Unit
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none  pl-4 pr-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Unit"
                defaultValue={editPurchase[2]}
                name="unit_bought"
                ref={register({
                  required: "Purchase unit is required"
                })} 
              />
              <p className="text-red-500 text-sm">{errors.unit_bought?.message}</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
                name="p_descr"
                defaultValue={editPurchase[3]}
                ref={register({
                  required: "Description is required"
                })} 
              >
              </textarea>
              <p className="text-red-500 text-sm">{errors.p_descr?.message}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Price
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none pl-4 pr-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Price"
                defaultValue={editPurchase[4]}
                name="price"
                ref={register({
                  required: "Price is required",
              })}
              />
               <p className="text-red-500 text-sm">{errors.price?.message}</p>
            </div>
          </div>

          <div className="mt-2 mb-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4"
                name="paid"
                value="Cash"
                ref={register({
                  required: "Cash status is required"
                })} 
              />
              <span className="ml-2">Cash</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio h-4 w-4"
                name="paid"
                value="Credit"
                ref={register({
                  required: "Cash status is required"
                })} 
              />
              <span className="ml-2">Credit</span>
            </label>
          </div>
          <p className="text-red-500 text-sm">{errors.paid?.message}</p>
         
          {/* buttons */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <input
                onClick={() => setModalIsOpen(false)}
                className="appearance-none block w-full bg-red-500 text-white font-bold  rounded-md pr-3 py-3 mb-3 leading-tight focus:outline-none  "
                id="grid-first-name"
                type="button"
                value="Close"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <input
                type="submit"
                className="appearance-none block w-full bg-green-500 text-white font-bold rounded-md  pr-3 py-3 leading-tight focus:outline-none  focus:border-gray-500"
                id="grid-last-name"
                value="Submit"
              />
            </div>
          </div>
        </form>
     
      </div>
    </>
  );
}

export default UpdatePurchases;
