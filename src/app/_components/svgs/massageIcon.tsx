import * as React from "react";

function MassageIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M14.77 1.846v8a.616.616 0 01-.657.615.629.629 0 01-.575-.634v-7.98a.616.616 0 00-.657-.616.63.63 0 00-.573.637V12a.308.308 0 01-.308.308H1.538A.308.308 0 011.231 12V1.846A1.846 1.846 0 013.077 0h9.846a1.846 1.846 0 011.846 1.846zM12 13.54H1.538a.308.308 0 00-.307.307v.923A1.23 1.23 0 002.46 16h8.616a1.231 1.231 0 001.23-1.23v-.924A.308.308 0 0012 13.54z"
        fill="#fff"
      />
    </svg>
  );
}

export default MassageIcon;
