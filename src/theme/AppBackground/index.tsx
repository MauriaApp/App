import React from "react";
import { ReactComponent as Shape } from "../../assets/svg/layout/shape.svg";

const AppBackground = () => {
  return (
    <div className="app-background">
      <Shape className={"shape top"} />
      <Shape className={"shape bottom"} />
    </div>
  );
};

export default AppBackground;
