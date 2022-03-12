import React from "react";
// Styles
import s from "./ProductSlider.module.css";
import cn from "classnames";
// KeenSlider
import { useKeenSlider } from "keen-slider/react";

const ProductSlider: React.FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <div className={s.root}>
      <div ref={sliderRef} className="keen-slider h-full transition-opacity">
        <button
          onClick={() => slider.current?.prev()}
          className={cn(s.leftControl, s.control)}
        />
        <button
          onClick={() => slider.current?.next()}
          className={cn(s.rightControl, s.control)}
        />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className}` : ""
                } keen-slider__slide`,
              },
            };
          }

          return child;
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
