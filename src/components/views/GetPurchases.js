import React,{useState, useEffect} from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar.js";
import AddPurchases from "./AddPurchases";
import Footer from "./Footer";
import { handlePurchasesDelete } from "../utils";
import UpdatePurchases from "./UpdatePurchases"
import { db } from "../../firebase";
import { collection,onSnapshot, query, orderBy } from "firebase/firestore";
import { FaPen } from "react-icons/fa";
import { 
         BsFillEyeFill, BsFillTrashFill,
        } from "react-icons/bs";

export default function GetPurchases() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ purchases, setPurchases ] = useState([]);
  const [ edit, setEdit] = useState([]);
 
 
  useEffect(() =>{
    const q = query(collection(db,"purchases"),orderBy("timestamp","desc"))
    const unsub= onSnapshot(q,(snapshot) =>{
      setPurchases(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    });
    
    return (unsub) 
  },[]);
  const y = purchases.filter(purchase=>purchase.purchase_name === "chicken");
  for(let i=0; i<y.length; i++){

  }
  



const handleUpdate = (id,purchase_name,description,unit,price,paid) => {
  setEdit([id,purchase_name,unit,description,price,paid])

}

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-green-100">
        <Navbar />
        {/* Header */}
        <div className="relative bg-green-400  md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* upper slot */}
              <AddPurchases />
                
            </div>
          </div>
        </div>
        
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
         <div className="flex flex-wrap mt-4">
            <div className=" mb-12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-72 -ml-4 md:w-72 lg:w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-blue-700">
                        All Purchases
                      </h3>
                    </div>
                  
                  </div>
                </div>
                <div className="inline-block w-full overflow-x-auto">
                  {/* Projects table */}
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                         Purchase Name
                        </th>
                        
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Description
                        </th>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          unit
                        </th>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Price
                        </th>
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Paid status
                        </th>
                        
                        <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {purchases.map(purchase =>(
                          <tr key={purchase.id} className="hover:bg-blue-50 cursor-pointer">
                          <td className="border-t-2 border-blue-100 px-6 align-middle lowercase border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                              {purchase.purchase_name}
                          </td>
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                          {purchase.description}
                          </td>
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                          {purchase.unit}
                          </td>
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">  
                            {purchase.price}
                          </td>
                          <td className="border-t-2 border-blue-100 text-white px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                              <span className={purchase.paid === 'Cash' ? "bg-green-500 px-2 py-1 rounded-full " : "bg-red-500 px-2 py-1 rounded-full " }> 
                              {purchase.paid === 'Cash' ? "Cash" : "Credit"}
                              </span>
                          </td>
                          
                          <td className="border-t-2 border-blue-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex ">
                            <BsFillEyeFill className="text-green-500 text-lg mr-3"/>
                            <FaPen onClick={()=>{setModalIsOpen(true); handleUpdate(purchase.id,purchase.purchase_name,purchase.description,purchase.unit,purchase.price,purchase.paid)}}  className="text-blue-500 text-lg mr-3"/>
                            <BsFillTrashFill onClick={()=>handlePurchasesDelete(purchase.id)}  className="text-red-500 text-lg mr-3"/>
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
          {modalIsOpen && <UpdatePurchases setModalIsOpen={setModalIsOpen} editPurchase={edit} />}
         
        <Footer />
        </div>
      </div>
    </>
  );
}
