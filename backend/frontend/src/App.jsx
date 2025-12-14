import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  const path = window.location.pathname;

  if (path === "/products") return <Products />;
  if (path === "/cart") return <Cart />;
  if (path === "/orders") return <Orders />;

  return <Login />;
}

export default App;
