// src/pages/ViewApplication.jsx
const ViewApplication = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white w-full max-w-md rounded-xl shadow p-8">
        <h2 className="text-lg font-semibold text-center text-green-700">
          View Job Vacancy Form
        </h2>

        <input placeholder="Registered Mobile" className="input" />
        <input placeholder="Registered Email" className="input" />

        <button className="w-full bg-green-800 text-white py-3 rounded mt-4">
          View Application
        </button>

        <p className="text-sm text-center mt-4">
          Not registered yet? <span className="text-blue-600 underline cursor-pointer">Click here</span>
        </p>
      </div>
    </div>
  );
};

export default ViewApplication;
