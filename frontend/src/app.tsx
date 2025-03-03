import "./App.css";
import { QueryClientProvider } from "./utils/query.tsx";
import { RouterProvider } from "./utils/router.tsx";

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  );
}

export default App;
