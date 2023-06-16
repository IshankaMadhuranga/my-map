import { FC } from "react";
import { Header } from "antd/es/layout/layout";
import { IHeader } from "../../common/interfaces/components";

const defaultProps = {
  header: "Header",
};

const AppHeader: FC<IHeader> = ({ header }) => {
  return (
    <Header className="app-header">
      <h2>{header}</h2>
    </Header>
  );
};
AppHeader.defaultProps = defaultProps;

export default AppHeader;
