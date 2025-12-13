import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true);

    if (error) {
      console.error("Errore Supabase:", error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  }

  if (loading) return <p>Caricamento prodotti...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>In Cucina con Glò</h1>

      {products.length === 0 && <p>Nessun prodotto disponibile</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 12 }}>
            <strong>{p.name}</strong> – {p.price}€ / {p.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}
