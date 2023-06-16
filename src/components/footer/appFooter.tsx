import { FC } from "react";
import { Footer } from "antd/es/layout/layout";
import { IFooter } from "../../common/interfaces/components";

const defaultProps = {
  footer: "Footer",
};

const AppFooter: FC<IFooter> = ({ footer }) => {
  return <Footer className="app-footer">{footer}</Footer>;
};

AppFooter.defaultProps = defaultProps;

export default AppFooter;
