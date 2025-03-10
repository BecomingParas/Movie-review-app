export const NotFound = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className=" text-4xl font-bold mb-4">404</h1>
        <p className=" text-blue-500 hover:text-blue-700  underline">
          Oops! page not found
        </p>
        <a href="/" className=" text-blue-500 hover:text-blue-700 underline">
          Return to home
        </a>
      </div>
    </div>
  );
};
