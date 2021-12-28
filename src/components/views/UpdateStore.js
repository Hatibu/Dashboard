import React,{useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { newStore } from "../utils"
import { BsX } from "react-icons/bs";
   import { db } from "../../firebase";
import { collection,onSnapshot, query, orderBy } from "firebase/firestore";

function UpdateStore({ setModalIsOpen, editStore}) {
    
    const { register, handleSubmit, formState: { errors } } = useForm(); //to store value from form
    const [ purchases, setPurchases ] = useState([]); //for set purchase data
    const [ unitInput, setUnitInput ] = useState(0); //for unit input field
    const [ typeInput, setTypeInput ] = useState(''); //for type input field
  
    useEffect(() =>{
      const q = query(collection(db,"purchases"),orderBy("timestamp","desc"))
      const unsub= onSnapshot(q,(snapshot) =>{
        setPurchases(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      });
      return (unsub) 
    },[]);

    // for store collection
    const [stores, setStores] = useState([]);
    useEffect(() =>{
      const q = query(collection(db, "stores"),orderBy("timestamp", "desc"))
        onSnapshot(q,(snapshot) =>{
        setStores(snapshot.docs.map((doc )=> ({ ...doc.data(), id: doc.id})));
      });
    },[]);
    
    const y = purchases.filter(purchase=> purchase.purchase_name === typeInput);
    const store_filter = stores.filter(store=> store.product_type === typeInput);
    
    let storeSum = 0;
    let sum = 0;
    const temp = []
    for(let i = 0; i < y.length; i++){
      sum = sum + parseInt(y[i].unit);
    }
   
    for(let j = 0; j < store_filter.length; j++){
      storeSum = storeSum + parseInt(store_filter[j].unit);
     
    }
    
    temp.push({value:sum,storeValue:storeSum});
    
    const handleUnitInput = (e) =>{
      setUnitInput(e.target.value)
    }

    const handleTypeInput = (e) =>{
      setTypeInput(e.target.value)
    }

    const handleUpdate = () =>{

    }

   
  
    return (
        <>
           
             
              <div  className="w-full lg:w-1/2 -ml-24 lg:ml-48 -mt-96 relative">
                  <form onSubmit={handleSubmit(newStore)}  className="lg:w-full  bg-gray-100 p-4 md:p-10 lg:p-10 shadow-2xl rounded-md ml-0 lg:ml-24">
                        <div className="">
                          
                            <BsX onClick={()=>setModalIsOpen(false)}  className="mb-3 text-2xl cursor-pointer font-bold ml-auto" />
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Person Name
                              </label>
                              <input  className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none  pl-4 pr-3 py-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                              id="grid-first-name"
                               type="text" 
                               placeholder="Person name" 
                               name="pers_name" 
                               defaultValue={editStore[1]}
                               ref={register({
                                 required: "Person name is required"
                               })} 
                               />
                                <p className="text-red-500 text-sm">{errors.pers_name?.message}</p>
                            </div>

                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Type
                            </label>
                            <select onChange={handleTypeInput}  
                            className="appearance-none lowercase block w-full text-sm  text-gray-700 rounded-lg border-2 border-gray-200 outline-none  pl-4 pr-3 py-2 leading-tight focus:outline-none bg-white focus:bg-white focus:border-gray-500 " 
                             type="text" placeholder="product type" name="product_type" 
                            ref={register({
                              required: "Type is required"
                            })} >
                            <option className="lowercase text-sm" value={editStore[2]} selected>{editStore[2]}</option>
                            {purchases.map(purchase=>(
                               <option className="lowercase text-sm" value={purchase.purchase_name}>{purchase.purchase_name}</option>
                            ))}
                            
                            </select>
                            <p className="text-red-500 text-sm">{errors.product_type?.message}</p>
                            </div>
                       </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Unit
                            </label>
                            { temp.map( item =>(
                            <input onChange={handleUnitInput} 
                            className={ "appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none  pl-4 pr-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" } 
                            type="number" 
                            placeholder={item.value - item.storeValue === 0? "purchases is 0" : "Enter unit" }
                            defaultValue={editStore[3]}
                             name="unit"
                             ref={register({
                               required: "Unit is required"
                             })} 
                             />
                             )) }
                             <p className="text-red-500 text-sm">{errors.unit?.message}</p>
                            { temp.map(item =>(
                              <p  className={ item.value - item.storeValue >= unitInput || unitInput === 0 ? "text-transparent text-sm px-3" : "text-red-500 text-sm px-3"}>Out of range, total is {item.value- item.storeValue}</p>
                            )) }
                            </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Time
                          </label>
                                <input  className="appearance-none block w-full  text-gray-700 rounded-lg border-2 border-gray-200 outline-none pl-4 pr-3 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                 type="date" 
                                 placeholder="Price"
                                 name="Time" 
                                 defaultValue={editStore[4]}
                                 ref={register({
                                   required: "Date is required"
                                 })}
                                 />
                                 <p className="text-red-500 text-sm">{errors.Time?.message}</p>
                        </div>
                    </div>
                    
                        {/* buttons */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <input onClick={()=>setModalIsOpen(false)}
                         className="appearance-none block w-full bg-red-500 text-white font-bold  rounded-md pr-3 py-3 mb-3 leading-tight focus:outline-none"  type="button" value="Close" />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <input type="submit" className="appearance-none block w-full bg-green-500 text-white font-bold rounded-md  pr-3 py-3 leading-tight focus:outline-none  focus:border-gray-500" id="grid-last-name"  value="Submit"  />
                      </div>
                    </div>
                      
                      
                  </form>
               </div>
              
              
            
        </>
    )
}

export default UpdateStore
