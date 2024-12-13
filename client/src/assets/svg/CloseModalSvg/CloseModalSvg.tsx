import { SvgProps } from "../../../types/SvgProps";

function CloseModalSvg({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_46_40"
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="22"
        height="22"
      >
        <path
          d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14.8285 9.17188L9.17149 14.8289M9.17149 9.17188L14.8285 14.8289"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_46_40)">
        <path d="M0 0H24V24H0V0Z" fill="white" />
      </g>
    </svg>
  );
}

export default CloseModalSvg;
