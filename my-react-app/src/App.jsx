console.log("API KEY:", import.meta.env.VITE_REACTAPP_KEY);
import { useEffect, useState } from "react";
import { Layout, Spin } from "antd";

import Sidebar from "./component/layout/sidebar";
import HeaderBar from "./component/layout/header";
import CategoryBar from "./component/gallery/CategoryBar";
import ImageGrid from "./component/gallery/ImageGrid";
import { fetchImagesApi } from "./service/UnsplashApi";

const { Content } = Layout;

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIcon, setActiveIcon] = useState("home");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchResetCounter, setSearchResetCounter] = useState(0);

  // core loader which can either replace or append results
  const fetchImages = async (newQuery = "", newPage = 1, append = false) => {
    // if we've already determined there are no more results, don't fetch again
    if (append && !hasMore) return;

    setLoading(true);

    const data = await fetchImagesApi(newPage, newQuery);
    console.log("Images received:", data);

    // ensure we have an array of items, filter out any falsy entries
    const clean = Array.isArray(data) ? data.filter(Boolean) : [];

    if (append) {
      setImages((prev) => {
        const merged = [...prev, ...clean];
        const unique = Array.from(new Map(merged.map((i) => [i.id, i])).values());
        return unique;
      });
    } else {
      // new search or category: replace list and scroll to top
      setImages(clean);
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    }

    setPage(newPage);
    setQuery(newQuery);
    setHasMore(clean.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    // initial load
    fetchImages();
  }, []);

  // infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !loading
      ) {
        console.log("scroll trigger, loading next page", page + 1);
        fetchImages(query, page + 1, true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, query, hasMore]);

  return (
  <Layout>
    <Sidebar
      activeIcon={activeIcon}
      setActiveIcon={setActiveIcon}
    />

    {/* MAIN AREA */}
    <Layout style={{ marginLeft: 80 }}>
      <HeaderBar
        onSearch={(term) => {
          // manual search clears active category
          setActiveCategory("");
          setSearchResetCounter((c) => c + 1);
          fetchImages(term);
        }}
        reset={searchResetCounter}
      />
      <CategoryBar
        fetchImages={(cat) => {
          // treat 'All' as clearing the active category and loading default images
          if (cat === "All") {
            setActiveCategory("");
            setSearchResetCounter((c) => c + 1);
            fetchImages("", 1, false);
          } else {
            setActiveCategory(cat);
            setSearchResetCounter((c) => c + 1);
            fetchImages(cat, 1, false);
          }
        }}
        activeCategory={activeCategory}
      />

      <Content
        style={{
          padding: 20,
          width: "100%",
        }}
      >
        <ImageGrid images={images} />
        {loading && images.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Spin size="large" />
          </div>
        )}
        {!hasMore && images.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
            No more images
          </div>
        )}
      </Content>
    </Layout>
  </Layout>
);
}

export default App;