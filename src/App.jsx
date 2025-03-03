import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import Voting from "./pages/Voting.jsx";
import Favourites from "./pages/Favourites.jsx";
import Likes from "./pages/Likes.jsx";
import Dislikes from "./pages/Dislikes.jsx";
import Search from "./pages/Search.jsx";
import Breeds from "./pages/Breeds.jsx";
import Gallery from "./pages/Gallery.jsx";
import RootLayout from "./pages/Root.jsx";
import ErrorPage from "./pages/Error.jsx";
import BreedInfo from "./pages/BreedInfo.jsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "voting", element: <Voting /> },
      { path: "breeds", element: <Breeds /> },
      { path: "breeds/:breedId", element: <BreedInfo /> },
      { path: "gallery", element: <Gallery /> },
      { path: "favourites", element: <Favourites /> },
      { path: "likes", element: <Likes /> },
      { path: "dislikes", element: <Dislikes /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

function App() {
//   useEffect(() => {
//     // Clear all items in localStorage when the component is mounted
//     localStorage.clear();

//     // Optionally, you can return a cleanup function in case you need to clear on unmount
//     return () => {
//         localStorage.clear();
//     };
// }, []);
  return (
   
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
