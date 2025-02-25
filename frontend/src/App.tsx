import "./App.css";
import { QueryClientProvider } from "./utils/query";
import { RouterProvider } from "./utils/router";

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  );
}

export default App;
