import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/cart/", {
      headers: {
        Authorization: "Bearer " + token, // ✅ IMPORTANT
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Please login again");
          window.location.href = "/";
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setCart(Array.isArray(data) ? data : []);
      })
      .catch(() => setCart([]));
  }, []);

  const checkout = () => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/orders/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token, // ✅ IMPORTANT
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Order placed successfully");
        window.location.href = "/orders";
      })
      .catch(() => alert("Order failed"));
  };

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id}>
          {item.product_name} × {item.quantity}
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={checkout}>Checkout</button>
      )}
    </div>
  );
}
