import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
export default function OrderPlot() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const data = [
    {
      name: "Jan",
      order: 0,
    },
    {
      name: "Feb",
      order: 0,
    },
    {
      name: "Mar",
      order: 0,
    },
    {
      name: "Apr",
      order: 0,
    },
    {
      name: "May",
      order: 0,
    },
    {
      name: "Jun",
      order: 0,
    },
    {
      name: "Jul",
      order: 0,
    },
    {
      name: "Aug",
      order: 0,
    },
    {
      name: "Sep",
      order: 0,
    },
    {
      name: "Oct",
      order: 0,
    },
    {
      name: "Nov",
      order: 0,
    },
    {
      name: "Dec",
      order: 0,
    },
  ];

  const funnel = () => {
    for (let i = 0; i < 12; i++) {
      let m = 0;
      const order_data = orders.filter(
        (order) => order.timestamp.toDate().getMonth() === i
      );
      m += order_data.length;
      data[i]["order"] = m;
    }
  };
  funnel();

  return (
    <>
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-800">
          <div className="rounded-t mb-0 px-4 py-3 bg-white">
            <div className="flex flex-wrap items-center ">
              <div className="relative  w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-indigo-400 mb-1 text-xs font-semibold">
                  Overview
                </h6>
                <h2 className="text-gray-500 text-xl font-semibold">Orders</h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto bg-white">
            {/* Chart */}
            <div className="relative" style={{ height: "350px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="order"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
