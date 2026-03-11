import {
  HomeOutlined,
  CompassOutlined,
  PlusSquareOutlined,
  HeartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";

const { Sider } = Layout;

export default function Sidebar({ activeIcon, setActiveIcon }) {
  const icons = [
    { name: "home", icon: <HomeOutlined /> },
    { name: "explore", icon: <CompassOutlined /> },
    { name: "upload", icon: <PlusSquareOutlined /> },
    { name: "likes", icon: <HeartOutlined /> },
    { name: "notifications", icon: <BellOutlined /> },
  ];

  return (
    <Sider width={80} style={styles.sider}>
      <div style={styles.top}>
        {icons.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveIcon(item.name)}
            style={{
              ...styles.icon,
              color: activeIcon === item.name ? "black" : "#888",
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div style={styles.bottom}>
        <UserOutlined
          onClick={() => setActiveIcon("profile")}
          style={{
            fontSize: 22,
            cursor: "pointer",
            color: activeIcon === "profile" ? "black" : "#888",
          }}
        />
      </div>
    </Sider>
  );
}

const styles = {
  sider: {
    background: "#fff",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    borderRight: "1px solid #eee",
  },
  top: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
    marginTop: 20,
    fontSize: 22,
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    textAlign: "center",
  },
  icon: { cursor: "pointer" },
};