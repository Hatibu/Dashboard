import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import { newPurchases } from "../utils"
import { BsDownload, BsPlus, BsX } from "react-icons/bs";

function AddPurchases() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { register, handleSubmit,  errors  } = useForm();
   
    return (
        <>
            <div className="flex space-x-3 ">
                    <span className="bg-green-800  rounded-md shadow-2xl text-white font-extrabold px-2 py-2 text-2xl">
                    <BsDownload />
                    </span>
                  
                      <span onClick={()=>{setModalIsOpen(true)}} className="bg-green-800 rounded-md shadow-xl text-white font-extrabold px-2 py-2 text-2xl"> 
                        <BsPlus />
                      </span>
                  </div>

                  {
                  modalIsOpen && 
                  <div  className=" relative w-full  lg:w-1/2  mt-10 lg:-mt-20">
                  <form onSubmit={handleSubmit(newPurchases)}  className="lg:w-full  bg-gray-100 p-4 md:p-10 lg:p-10 shadow-2xl rounded-md ml-0 lg:ml-24">
                        <div className="">
                            <BsX onClick={()=>setModalIsOpen(false)}  className="mb-3 text-2xl cursor-pointer font-bold ml-auto" />
                        </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Purchase Name
                              </label>
                              <input  className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none  pl-4 pr-3 py-2 mb-3 leading-tight focus:outline-none ffocus:bg-white focus:border-gray-500" 
                              id="grid-first-name" 
                              type="text" 
                              placeholder="Purchase name" 
                              name="p_name"
                               ref={register({
                                 required: "Purchase name is required"
                               })}
                                />
                                <p className="text-red-500 text-sm">{errors.p_name?.message}</p>
                            </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Unit
                      </label>
                      <input  className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none  pl-4 pr-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                       type="number" 
                       placeholder="Unit" 
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
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                          Description
                          </label>
                          <textarea className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:bg-white focus:border-gray-500" 
                          rows="4"
                           name="p_descr" 
                           ref={register({
                             required: "Description is required"
                           })} 
                           >
                           </textarea>
                           <p className="text-red-500 text-sm">{errors.p_descr?.message}</p>
                        </div>
                        
                        
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Price
                          </label>
                                <input  className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none pl-4 pr-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                 id="grid-last-name" 
                                 type="number" 
                                 placeholder="Price"
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
                          <input type="radio" className="form-radio h-4 w-4 "
                           name="paid"
                            value="Cash" 
                            ref={register({
                              required: "Cash status is required"
                            })} 
                            />
                          <span className="ml-2">Cash</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                          <input type="radio" className="form-radio h-4 w-4" 
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
                        <input onClick={()=>setModalIsOpen(false)} className="appearance-none block w-full bg-red-500 text-white font-bold  rounded-md pr-3 py-3 mb-3 leading-tight focus:outline-none  " id="grid-first-name" type="button" value="Close" />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <input type="submit" className="appearance-none block w-full bg-green-500 text-white font-bold rounded-md  pr-3 py-3 leading-tight focus:outline-none  focus:border-gray-500" id="grid-last-name"  value="Submit"  />
                      </div>
                    </div>
                      
                      
                  </form>
               </div>
                  }

             
            
        </>
    )
}

export default AddPurchases
