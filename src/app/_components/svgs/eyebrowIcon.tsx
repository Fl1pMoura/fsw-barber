import { SVGProps } from "react";

function EyebrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_31320_1159)">
        <path
          d="M13.045 6.081c1.239.559 2.306 1.397 2.882 2.585a.728.728 0 01-.82 1.026c-4.332-1.016-8.715.73-11.025 1.682-1.45.598-2.859.11-3.587-.873a2.443 2.443 0 01-.477-1.753c.247-2.04 2.811-2.912 4.503-3.296 2.75-.624 5.926-.544 8.524.629z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="clip0_31320_1159">
          <path fill="#fff" d="M0 0H16V16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default EyebrowIcon;
