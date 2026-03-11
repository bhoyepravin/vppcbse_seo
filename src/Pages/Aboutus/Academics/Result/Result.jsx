import React from "react";
import { resultData } from "../../../../constant/Aboutus/Academics/Result/resultData";

const Result = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-500 mb-10">
          Academic Results
        </h2>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100">
                <th className="border border-orange-300 px-6 py-4 text-left text-gray-700 font-semibold">
                  Year
                </th>
                <th className="border border-orange-300 px-6 py-4 text-left text-gray-700 font-semibold">
                  Result
                </th>
              </tr>
            </thead>

            <tbody>
              {resultData.map((item, index) => (
                <tr key={index} className="hover:bg-orange-50 transition">
                  <td className="border border-orange-300 px-6 py-4 text-gray-600">
                    {item.year}
                  </td>
                  <td className="border border-orange-300 px-6 py-4 text-gray-600">
                    {item.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Result;
