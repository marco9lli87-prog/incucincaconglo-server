import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const STORAGE_URL =
  import.meta.env.VITE_SUPABASE_URL +
  "/storage/v1/object/public/products/"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("name")

    if (!error) setProducts(data)
    else console.error(error)
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>In Cucina con Glò</h1>

      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <img
              src={STORAGE_URL + p.image}
              alt={p.name}
              style={styles.image}
            />
            <h2 style={styles.name}>{p.name}</h2>
            <p style={styles.price}>
              {p.price} € / {p.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    background: "#0b0b0b",
    minHeight: "100vh",
    padding: "40px",
    color: "#f5f5f5",
    fontFamily: "serif"
  },
  title: {
    textAlign: "center",
    fontSize: "42px",
    color: "#d4af37",
    marginBottom: "40px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px"
  },
  card: {
    background: "#111",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },
  name: {
    margin: "16px 0 4px",
    fontSize: "18px"
  },
  price: {
    marginBottom: "16px",
    color: "#d4af37",
    fontWeight: "bold"
  }
}
