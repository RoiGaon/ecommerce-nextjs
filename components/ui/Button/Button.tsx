import React from "react";
// Styles
import s from "./Button.module.css";
import cn from "classnames";
// Components
import { LoadingDots } from "@components/ui";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
  Component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  href?: string;
}

const Button: React.FC<Props> = ({
  children,
  className,
  isLoading = false,
  Component = "button",
  ...rest
}) => {
  const rootClassName = cn(s.root, className, { [s.loading]: isLoading });

  return (
    <Component className={rootClassName} type="button" {...rest}>
      {children}
      {isLoading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
};

export default Button;
