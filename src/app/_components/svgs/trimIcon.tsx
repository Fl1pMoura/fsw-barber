import { SVGProps } from "react";

function TrimIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M14.4 4.8c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8v-.8H1.6v.8c.44 0 .8.36.8.8 0 .44-.36.8-.8.8H0v5.6h1.6c.44 0 .8.36.8.8 0 .44-.36.8-.8.8v.8h12.8V12c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8H16V4.8h-1.6zm0 3.2h-.8v.8H12V8H9.128c-.168.464-.608.8-1.128.8-.52 0-.96-.336-1.128-.8H4v.8H2.4V8h-.8v-.8h.8v-.8H4v.8h2.872c.168-.464.608-.8 1.128-.8.52 0 .96.336 1.128.8H12v-.8h1.6v.8h.8V8z"
        fill="#fff"
      />
    </svg>
  );
}

export default TrimIcon;
