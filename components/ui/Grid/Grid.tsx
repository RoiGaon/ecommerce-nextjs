import React from "react";
// Styles
import s from "./Grid.module.css";
import cn from "classnames";

interface Props {
  children: React.ReactNode[];
  layout?: "A" | "B";
}

const Grid: React.FC<Props> = ({ children, layout = "A" }) => {
  const rootClassName = cn(s.root, {
    [s.layoutA]: layout === "A",
    [s.layoutB]: layout === "B",
  });

  return <div className={rootClassName}>{children}</div>;
};

export default Grid;
