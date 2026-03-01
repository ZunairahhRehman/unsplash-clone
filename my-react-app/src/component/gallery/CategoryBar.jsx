export default function CategoryBar({ fetchImages, activeCategory = "" }) {
  const categories = [
    "All","Nature","Travel","Technology","Animals","Food","Culture","Architecture","Fashion"
  ];

  return (
    <div style={styles.container}>
      {categories.map((cat) => {
        const isActive = (activeCategory === "" && cat === "All") || (cat.toLowerCase() === activeCategory.toLowerCase());
        return (
          <span
            key={cat}
            style={{
              ...styles.item,
              borderBottom: isActive ? "2px solid #000" : "2px solid transparent",
              fontWeight: isActive ? 700 : 500,
            }}
            onClick={() => fetchImages(cat)}
          >
            {cat}
          </span>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "10px 20px",
    display: "flex",
    gap: 20,
    borderBottom: "1px solid #eee",
    overflowX: "auto",
  },
  item: { cursor: "pointer", fontWeight: 500 },
};