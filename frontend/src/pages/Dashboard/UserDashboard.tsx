import { DashboardResponse } from "@/types/dashboard.types";

const UserDashboard = ({ data }: { data: DashboardResponse }) => {
  return (
    <div className="min-h-screen p-20 bg-gray-50">
      <div className="flex gap-6">
        {/* Profile Section */}
        <div className="w-1/3 bg-white shadow rounded-lg p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto text-white flex items-center justify-center text-xl font-bold">
              {data.username?.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{data.username}</h3>
            <p className="text-gray-500">{data.role}</p>
          </div>
          <div className="mt-4">
            <p>
              Email: <span className="text-gray-700">moviefan@example.com</span>
            </p>
            <p>
              Member since:{" "}
              <span className="text-gray-700">{data.memberSince}</span>
            </p>
            <p>
              Favorite Genre:{" "}
              <span className="text-gray-700">{data.favoriteGenre}</span>
            </p>
          </div>
          <button className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg">
            Edit Profile
          </button>
        </div>

        {/* Stats Section */}
        <div className="w-2/3 bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{data.moviesWatched}</p>
              <p className="text-gray-500">Movies Watched</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{data.hoursWatched}</p>
              <p className="text-gray-500">Hours Watched</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{data.watchlistCount}</p>
              <p className="text-gray-500">Watchlist</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">{data.recentActivity.length}</p>
              <p className="text-gray-500">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Your Reviews</h3>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{activity.movieTitle}</h4>
                <p className="text-gray-500">{activity.action}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg">
          Add Review
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
