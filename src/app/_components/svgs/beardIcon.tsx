import { SVGProps } from "react";

function SvgComponent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.546 7.273c-1.455 0-2.182-2.182-4.364-2.182S8 6.546 8 6.546 8 5.09 5.818 5.09 2.91 7.273 1.455 7.273C.727 7.273 0 6.546 0 6.546s.727 3.636 3.636 3.636C7.273 10.182 8 8 8 8s.727 2.182 4.364 2.182c2.909 0 3.636-3.636 3.636-3.636s-.727.727-1.454.727z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgComponent;
