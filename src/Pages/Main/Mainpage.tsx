export default function Mainpage() {
  const categories = [
    "Home Essentials",
    "Clothing",
    "Beauty",
    "Daily Needs",
    "Electronics",
    "Accessories",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Search Bar */}
      <div className="px-4 pt-6 pb-3">
        <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none flex-1 text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          What are you looking for?
        </h2>

        <div className="space-y-3">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl px-4 py-4 flex items-center justify-between active:scale-95 transition"
            >
              <span className="text-base text-gray-900 font-medium">
                {item}
              </span>
              <span className="text-gray-400">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
