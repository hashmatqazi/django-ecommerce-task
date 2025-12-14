import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  // Load products
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  // Add to cart (FINAL, CORRECT)
  const addToCart = (productId) => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/cart/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: productId,
        quantity: 1,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Added to cart");
      })
      .catch(() => alert("Add to cart failed"));
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map((p) => (
        <div key={p.id}>
          <b>{p.name}</b> – ₹{p.price}
          <br />
          <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
