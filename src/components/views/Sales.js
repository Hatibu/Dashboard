import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillPieChart } from "react-icons/ai";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import { db } from "../../firebase";
import OrderPlot from "../charts/Orderplot";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar.js";
import Footer from "./Footer";

function Sales() {
  const [revenues, setRevenues] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const sub = onSnapshot(q, (snapshot) => {
      setRevenues(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return sub;
  }, []);

  const CashOrder = revenues.filter((revenue) => revenue.payment === "cash");
  let cash = CashOrder.length;

  const CreditOrder = revenues.filter((revenue) => revenue.payment === "debit");
  let credit = CreditOrder.length;

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-indigo-100">
        <Navbar />

        <div className="relative bg-indigo-400  md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-gray-400 uppercase font-bold text-xs">
                            Orders Cashed
                          </h5>

                          <span className="font-semibold text-xl text-black">
                            {cash}
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
                            Orders Credited
                          </h5>

                          <span className="font-semibold text-xl text-black">
                            {credit}
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
        <div className="-mt-10">
          <OrderPlot />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Sales;
