import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  el?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

const Container: React.FC<Props> = ({ children, el: Component = "div" }) => {
  return <Component className="px-6 mx-auto max-w-8xl">{children}</Component>;
};

export default Container;
