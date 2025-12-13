import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true);

      if (error) {
        console.error("Errore prodotti:", error);
      } else {
        setProducts(data);
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <h1>In Cucina con Glò</h1>

      {products.length === 0 && <p>Nessun prodotto trovato</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.price} € / {p.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}
