function HydrateIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M4.363 8.727a3.636 3.636 0 017.273 0v3.636c0 1.372 0 2.057-.426 2.484-.426.426-1.111.426-2.483.426H7.272c-1.371 0-2.056 0-2.483-.426-.426-.427-.426-1.112-.426-2.483V8.726z"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.545 5.09v-.726c0-.686 0-1.029.213-1.242.213-.213.556-.213 1.242-.213m0 0c.685 0 1.028 0 1.241.213.213.213.213.556.213 1.242v.727M8 2.909V.727m0 0H6.545M8 .727h1.996c.55 0 1.08.209 1.484.584l.156.144M4.363 8.727h7.273"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={4} y={9} width={8} height={6} rx={1} fill="#fff" />
    </svg>
  );
}

export default HydrateIcon;
