import React from "react";

function Material() {
  return (
    <div className="bg-white min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-blue-200 text-white h-full w-1/4 py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Material</h1>
        {/* Sidebar options */}
        <ul className="space-y-4">
          <li className="hover:bg-blue-300 rounded-md p-4 cursor-pointer transition duration-300 shadow-md">
            Option 1
          </li>
          <li className="hover:bg-blue-300 rounded-md p-4 cursor-pointer transition duration-300 shadow-md">
            Option 2
          </li>
          <li className="hover:bg-blue-300 rounded-md p-4 cursor-pointer transition duration-300 shadow-md">
            Option 3
          </li>
          <li className="hover:bg-blue-300 rounded-md p-4 cursor-pointer transition duration-300 shadow-md">
            Option 4
          </li>
          <li className="hover:bg-blue-300 rounded-md p-4 cursor-pointer transition duration-300 shadow-md">
            Option 5
          </li>
          <li className="hover:bg-blue-300 rounded-md p-4 cursor-pointer transition duration-300 shadow-md">
            Option 6
          </li>
          <li className="hover:bg-blue-300 rounded-md p-4 cursor-pointer transition duration-300 shadow-md">
            Option 7
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
}

export default Material;
