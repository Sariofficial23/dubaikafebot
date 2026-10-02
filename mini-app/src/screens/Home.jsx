import Icon from '../components/Icon.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { categoriesOf, GRADIENTS } from '../format.js';
import { getTgUser, openLink } from '../telegram.js';

export default function Home({ products, banners, loading, onCategory, onOpen }) {
  const user = getTgUser();
  const cats = categoriesOf(products);
  const hits = products.filter((p) => p.oldPrice && p.oldPrice > p.newPrice).slice(0, 6);

  const onBanner = (b) => {
    if (b.linkType === 'category' && b.linkValue) onCategory(b.linkValue);
    else if (b.linkType === 'url' && b.linkValue) openLink(b.linkValue);
  };

  return (
    <div className="screen">
      <header className="home-head">
        <div>
          <div className="muted small">Assalomu alaykum{user?.first_name ? `, ${user.first_name}` : ''}</div>
          <h1 className="title xl brand">Dubai Kafe</h1>
        </div>
        <div className="logo-dot"><Icon name="cup" size={26} /></div>
      </header>

      {banners.length > 0 && (
        <div className="banners">
          {banners.map((b) => (
            <div
              key={b.id}
              className="banner"
              style={{ background: GRADIENTS[b.color] || GRADIENTS.red }}
              onClick={() => onBanner(b)}
            >
              <div className="banner-text">
                <div className="banner-title">{b.title}</div>
                {b.subtitle && <div className="banner-sub">{b.subtitle}</div>}
                {b.price && <div className="banner-price">{b.price}</div>}
              </div>
              {b.image ? <img src={b.image} alt="" className="banner-img" /> : b.emoji ? <div className="banner-emoji">{b.emoji}</div> : null}
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title">Kategoriyalar</h2>
      {loading ? (
        <div className="cat-grid">{[1, 2, 3, 4].map((i) => <div key={i} className="cat-tile skeleton" />)}</div>
      ) : (
        <div className="cat-grid">
          {cats.map((c) => {
            const img = products.find((p) => p.category === c && p.image)?.image;
            return (
              <button key={c} className="cat-tile glass" onClick={() => onCategory(c)}>
                {img ? <img src={img} alt="" /> : <Icon name="cup" size={30} stroke={1.6} />}
                <span>{c}</span>
              </button>
            );
          })}
        </div>
      )}

      {hits.length > 0 && (
        <>
          <h2 className="section-title"><Icon name="sparkles" size={20} /> Aksiyadagi taomlar</h2>
          <div className="pgrid">{hits.map((p) => <ProductCard key={p.id} product={p} onOpen={onOpen} />)}</div>
        </>
      )}
    </div>
  );
}
