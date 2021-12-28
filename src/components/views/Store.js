import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar.js";
import Footer from "./Footer";
import AddStore from "./AddStore";
import UpdateStore from "./UpdateStore";
import { handleStoreDelete } from "../utils";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { FaPen } from "react-icons/fa";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";

export default function Store() {
  const [stores, setStores] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ edit, setEdit] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "stores"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setStores(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);


const handleUpdate = (id,pers_name,product_type,unit,Time) => {
  setEdit([id,pers_name,product_type,unit,Time])

}

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-yellow-100">
        <Navbar />
        {/* Header */}
        <div className="relative bg-yellow-400  md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* upper slot */}
              <AddStore />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap mt-4">
            <div className=" mb-12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-72 -ml-4 md:w-72 lg:w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 w-64 md:w-72 lg:w-full py-3 border-0 bg-white">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 md:w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-blue-700">
                        All Stores
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="inline-block w-full overflow-x-auto">
                  {/* Projects table */}
                  <table className="items-center  bg-transparent border-collapse text-center">
                    <thead>
                      <tr>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Person Name
                        </th>

                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Type of Product
                        </th>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          unit
                        </th>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          date
                        </th>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stores.map((store) => (
                        <tr className="text-center text-md">
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
                            {store.pers_name}
                          </td>
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                            {store.product_type}
                          </td>
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                            {store.unit}
                          </td>
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                            {store.Time}
                          </td>
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex ">
                              <BsFillEyeFill className="text-green-500 text-lg mr-3 cursor-pointer" />
                              <FaPen onClick={()=>{setModalIsOpen(true);  handleUpdate(store.id,store.pers_name,store.product_type,store.unit,store.Time) }} className="text-blue-500 text-lg mr-3 cursor-pointer" />
                              <BsFillTrashFill
                                onClick={() => {
                                  handleStoreDelete(store.id);
                                }}
                                className="text-red-500 text-lg mr-3 cursor-pointer"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {modalIsOpen && <UpdateStore setModalIsOpen={setModalIsOpen} editStore={edit}  />}
          <Footer />
        </div>
      </div>
    </>
  );
}
