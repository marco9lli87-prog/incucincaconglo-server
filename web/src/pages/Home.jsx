import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function Home() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
        } else {
          setProducts(data || [])
        }
      })
  }, [])

  function addToCart(product) {
    setCart(c => ({
      ...c,
      [product.id]: (c[product.id] || 0) + 1
    }))
  }

  return (
    <div className="container">
      <header className="header">
        <h1>In Cucina con Glò</h1>
        <p>Pasta fresca artigianale</p>
      </header>

      <section className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.image_url} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price} € / {p.unit}</p>
            <button onClick={() => addToCart(p)}>Aggiungi</button>
          </div>
        ))}
      </section>

      <footer className="cart">
        <h2>Carrello</h2>
        {Object.keys(cart).length === 0 && <p>Carrello vuoto</p>}
        {Object.entries(cart).map(([id, qty]) => {
          const p = products.find(x => x.id === id)
          return (
            <div key={id}>
              {p?.name} × {qty}
            </div>
          )
        })}
      </footer>
    </div>
  )
}
