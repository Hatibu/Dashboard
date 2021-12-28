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
export default function LinePlot() {
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "purchases"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPurchases(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const data = [
    {
      name: "Jan",
      total: 0,
    },
    {
      name: "Feb",
      total: 0,
    },
    {
      name: "Mar",
      total: 0,
    },
    {
      name: "Apr",
      total: 0,
    },
    {
      name: "May",
      total: 0,
    },
    {
      name: "Jun",
      total: 0,
    },
    {
      name: "Jul",
      total: 0,
    },
    {
      name: "Aug",
      total: 0,
    },
    {
      name: "Sep",
      total: 0,
    },
    {
      name: "Oct",
      total: 0,
    },
    {
      name: "Nov",
      total: 0,
    },
    {
      name: "Dec",
      total: 0,
    },
  ];

  const funnel = () => {
    for (let i = 0; i < 12; i++) {
      let m = 0;
      const purchase_data = purchases.filter(
        (purchase) => purchase.timestamp.toDate().getMonth() === i
      );
      purchase_data.map((data) => (m += parseInt(data.price)));
      data[i]["total"] = m;
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
                <h6 className="uppercase text-blue-500 mb-1 text-xs font-semibold">
                  Overview
                </h6>
                <h2 className="text-gray-500 text-xl font-semibold">
                  Purchases
                </h2>
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
                    dataKey="total"
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
