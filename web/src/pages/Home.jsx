import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true);

    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
  }

  return (
    <div>
      <h1>In Cucina con Glò</h1>

      {products.length === 0 && <p>Nessun prodotto trovato</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} – {p.price} € / {p.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}
