import React, { useState, useEffect } from "react";
import LinePlot from "../charts/LinePlot";
import RevenuePlot from "../charts/RevenuePlot";

import Navbar from "../Navbar";
import Footer from "./Footer";
import Sidebar from "../Sidebar.js";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import { AiFillPieChart, AiOutlinePercentage } from "react-icons/ai";
import { useAuth } from "../../auth";
import Login from "./Login";

export default function Dashboard() {
  const [purchases, setPurchases] = useState([]);
  const [revenues, setRevenues] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    const q = query(collection(db, "purchases"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setPurchases(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const sub = onSnapshot(q, (snapshot) => {
      setRevenues(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return sub;
  }, []);
  const purchases_data = purchases.filter(
    (purchase) => purchase.paid === "Cash"
  );
  let sum = 0;
  for (let i = 0; i < purchases_data.length; i++) {
    sum = sum + parseInt(purchases_data[i].price);
  }

  const debit_data = purchases.filter((purchase) => purchase.paid === "Credit");
  let debit = 0;
  for (let i = 0; i < debit_data.length; i++) {
    debit = debit + parseInt(debit_data[i].price);
  }
  const revenue_data = revenues.filter((revenue) => revenue.payment === "cash");
  let earn = 0;
  for (let i = 0; i < revenue_data.length; i++) {
    earn = earn + parseInt(revenue_data[i].total);
  }
  const credit_data = revenues.filter((revenue) => revenue.payment === "debit");
  let credit = 0;
  for (let i = 0; i < credit_data.length; i++) {
    credit = credit + parseInt(credit_data[i].total);
  }

  return (
    <>
      {auth.user ? (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blue-100">
            <Navbar />
            {/* Header */}
            <div className="relative bg-blue-400  md:pt-32 pb-32 pt-12">
              <div className="px-4 md:px-10 mx-auto w-full">
                <div>
                  {/* Card stats */}
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-gray-400 uppercase font-bold text-xs">
                                revenue
                              </h5>

                              <span className="font-semibold text-xl text-black">
                                {earn} Tsh
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <FaChartBar />
                              </div>
                            </div>
                          </div>
                          <div className="details flex items-center mt-6">
                            <BsArrowUpShort className="text-2xl text-green-400" />
                            <p className="text-sm text-green-400 ">
                              <span className="text-green-500 mr-2">3.48%</span>
                              <span className="whitespace-nowrap text-black">
                                Since last month
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-gray-400 uppercase font-bold text-xs">
                                creditor
                              </h5>

                              <span className="font-semibold text-xl text-black">
                                {credit} Tsh
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-xl text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-yellow-500">
                                <AiFillPieChart />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mt-6">
                            <BsArrowDownShort className="text-2xl text-red-500" />
                            <p className="text-sm text-blue-400 ">
                              <span className="text-red-500 mr-2">3.48%</span>
                              <span className="whitespace-nowrap text-black">
                                Since last week
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-gray-400 uppercase font-bold text-xs">
                                purchases
                              </h5>

                              <span className="font-semibold text-xl text-black">
                                {sum} Tsh
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-xl text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500">
                                <AiFillPieChart />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mt-6">
                            <BsArrowDownShort className="text-2xl text-red-500" />
                            <p className="text-sm text-red-500 ">
                              <span className="text-orange-500 mr-2">
                                1.10%
                              </span>
                              <span className="whitespace-nowrap text-black">
                                Since yesterday
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-gray-400 uppercase font-bold text-xs">
                                debtors
                              </h5>

                              <span className="font-semibold text-xl text-black">
                                {debit} Tsh
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-xl text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                                <AiOutlinePercentage />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mt-6">
                            <BsArrowUpShort className="text-2xl text-green-400" />
                            <p className="text-sm ">
                              <span className="text-green-400 mr-2">12%</span>
                              <span className="whitespace-nowrap text-black">
                                Since last month
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*End Card stats */}
                </div>
              </div>
            </div>

            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <div className="w-full">
                <LinePlot />
                <RevenuePlot />
              </div>

              <Footer />
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
