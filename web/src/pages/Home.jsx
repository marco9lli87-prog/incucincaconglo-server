import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase error:", error);
        } else {
          setProducts(data || []);
        }
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>In Cucina con Glò</h1>

      {products.length === 0 && <p>Nessun prodotto trovato</p>}

      <div style={{ display: "grid", gap: 16 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <strong>{p.name}</strong>
            <div>
              {p.price} € / {p.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
