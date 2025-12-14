import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => setOrders([]));
  }, []);

  return (
    <div>
      <h2>Order History</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((o) => (
        <div key={o.order_id}>
          ₹{o.total_price} – {o.status}
        </div>
      ))}
    </div>
  );
}
