import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    slug: "electronics",
    label: "Electronic Gadgets",
    tagline: "Mice, keyboards, hubs, stands, and more",
    image: "https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232338/wireless-mouse_m4d8rk.webp",
  },
  {
    slug: "decorative",
    label: "Decorative Items",
    tagline: "Vases, clocks, lamps, and home accents",
    image: "https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232335/ceramic_vase_atcgev.jpg",
  },
  {
    slug: "sarees",
    label: "Sarees",
    tagline: "Silk, cotton, and festive weaves",
    image: "https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232334/saree_z6usaa.webp",
  },
  {
    slug: "bangles",
    label: "Bangles",
    tagline: "Chudi sets for every occasion",
    image: "https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232338/bangle1_oqhewc.webp",
  },
];

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Welcome back</span>
          <h1>Everything you love, all in one place</h1>
          <p className="hero-subtitle">
            From everyday gadgets to festive wear — browse curated picks across
            electronics, home decor, sarees, and bangles.
          </p>
          <a href="#categories" className="hero-cta">
            Start exploring
          </a>
        </div>

        <div className="hero-visual">
          <img src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232333/lehanga_iqkq85.avif" alt="" className="hero-visual-img hero-visual-img-1" />
          <img src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232332/wall_dec_ump5jn.avif" alt="" className="hero-visual-img hero-visual-img-2" />
          <img src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232333/earings_ff7obs.avif" alt="" className="hero-visual-img hero-visual-img-3" />
          <img src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232331/earpots_lydufg.avif" alt="" className="hero-visual-img hero-visual-img-4" />
          <img src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232331/kurtha_z0oxlk.avif" alt="" className="hero-visual-img hero-visual-img-5" />
        </div>
      </section>

      <section id="categories">
        <h2 className="section-heading">Shop by category</h2>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} to={`/products/${cat.slug}`} className="category-tile">
              <div className="category-tile-image">
                <img src={cat.image} alt={cat.label} />
              </div>
              <div className="category-tile-label">
                <h3>{cat.label}</h3>
                <p>{cat.tagline}</p>
                <span className="category-tile-link">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;