function StatCard({ title, value }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg p-6">

      <p className="text-lg">
        {title}
      </p>

      <h1 className="text-5xl font-bold mt-3">
        {value}
      </h1>

    </div>
  );
}

export default StatCard;