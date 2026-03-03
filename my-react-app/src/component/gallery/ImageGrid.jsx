import Masonry from "react-masonry-css";
import { Card, Tooltip } from "antd";
import {
  HeartOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";

const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  1000: 2,
  700: 1,
};

export default function ImageGrid({ images }) {
  const validImages = Array.isArray(images)
    ? images.filter((img) => img && img.id && img.urls && img.urls.small)
    : [];

  if (!validImages || validImages.length === 0)
    return <h2 style={{ textAlign: "center" }}>No Images Found</h2>;

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {validImages.map((img) => (
        <Card
          key={img.id}
          hoverable
          bodyStyle={{ padding: 0 }}
          style={{
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
          }}
          cover={
            <img
              src={img.urls.small}
              alt={img.alt_description || "Unsplash Image"}
              loading="lazy"
              style={{ width: "100%", display: "block" }}
            />
          }
        >
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              right: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <Tooltip title={img.user?.name || "Unknown"}>
              <UserOutlined />
            </Tooltip>

            <div>
              <HeartOutlined style={{ marginRight: 10 }} />
              <ShareAltOutlined />
            </div>
          </div>
        </Card>
      ))}
    </Masonry>
  );
}