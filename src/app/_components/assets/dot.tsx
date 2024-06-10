import * as React from "react";

function Dot(props: any) {
  return (
    <svg
      width={8}
      height={8}
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={4} cy={4} r={3} fill="#3B82F6" {...props} />
    </svg>
  );
}

export default Dot;
