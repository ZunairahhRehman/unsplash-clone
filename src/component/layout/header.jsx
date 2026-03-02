import { Layout, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Header } = Layout;

export default function HeaderBar({ onSearch, reset }) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (!value.trim()) return;
    onSearch(value.trim());
    setValue("");
  };

  // clear input when parent signals a reset
  useEffect(() => {
    setValue("");
  }, [reset]);

  return (
    <Header style={styles.header}>
      <div style={styles.wrapper}>
        <div style={styles.left}>
          <div style={styles.logo}>Unsplash Clone</div>

          <Input
            placeholder="Search images..."
            size="large"
            style={{ width: 600 }}
            prefix={<SearchOutlined />}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={handleSearch}
          />
        </div>

        <Button onClick={handleSearch}>+ Submit</Button>
      </div>
    </Header>
  );
}


const styles = {
  header: { position: "sticky", top: 0, background: "#fff", zIndex: 1 },
  wrapper: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  left: { display: "flex", gap: 10, alignItems: "center" },
  logo: { fontWeight: "bold", fontSize: 20 },
};