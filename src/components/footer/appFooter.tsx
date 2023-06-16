import { FC, CSSProperties } from "react";
import { Footer } from "antd/es/layout/layout";
import { IFooter } from "../../common/interfaces/components";

const footerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "4rem",
  backgroundColor: "#7dbcea",
};
const AppFooter: FC<IFooter> = ({ footer }) => {
  return <Footer style={footerStyle}>{footer}</Footer>;
};

export default AppFooter;
