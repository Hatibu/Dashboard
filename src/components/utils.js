import {db } from "../firebase";
import { doc, deleteDoc,setDoc,updateDoc,collection,addDoc, serverTimestamp } from "firebase/firestore";

export const newPurchases = async (data, r) =>{
    const purchase_name = data.p_name.toLowerCase();
    const unit = data.unit_bought;
    const description = data.p_descr.toLowerCase();
    const price = data.price;
    const paid = data.paid;
    const purchases_data = {purchase_name, unit, description, price, paid, timestamp: serverTimestamp()}
   
    try{
     const collectionRef = collection(db, "purchases");
     await addDoc(collectionRef, purchases_data);
     alert("Registration successfully");
     r.target.reset();
    }catch(err){
      console.log(err);
    }
   
 
  };

export const handlePurchasesDelete = async (id) =>{
    const docRef = doc(db, "purchases", id);
    const r = window.confirm("Press a button!");
    if (r === true){
      await deleteDoc(docRef);
    }
   

}

export const handlePurchaseEdit = async (data) => {
  const id = data.id;
  const purchase_name = data.p_name.toLowerCase();
  const unit = data.unit_bought;
  const description = data.p_descr.toLowerCase();
  const price = data.price;
  const paid = data.paid;
  const purchases_data = {purchase_name, unit, description, price, paid, timestamp: serverTimestamp()}

  try{
    const collectionRef = doc(db, "purchases",id);
     await setDoc(collectionRef, purchases_data);
     alert("Update successfully");

  }catch(err){
    console.log(err)
  }

}

// logics for store operations
export const newStore = async (data,r) =>{
    const pers_name= data.pers_name.toLowerCase();
    const product_type = data.product_type.toLowerCase();
    const unit = data.unit;
    const Time = data.Time;
    const store_data = { pers_name, product_type, unit, Time, timestamp: serverTimestamp()}
    
  try{
    console.log(store_data)
    const collectionRef = collection(db, "stores");
    await addDoc(collectionRef, store_data);
    alert("Registration successfully");
    r.target.reset();
   }catch(err){
     console.log(err);
   }

};

export const handleStoreDelete = async (id) =>{
  const docRef = doc(db, "stores", id);
  const r = window.confirm("Press a button!");
  if (r === true){
    await deleteDoc(docRef);
  }

}