import { SvgProps } from "../../../types/SvgProps";

function PrizeArrowSvg({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="29"
      height="15"
      viewBox="0 0 29 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.776 14.0909C12.9867 15.303 16.0133 15.303 17.224 14.0909L28.5739 2.72727C29.7846 1.51515 28.2712 0 25.8499 0H3.15007C0.728754 0 -0.784564 1.51515 0.426095 2.72727L11.776 14.0909Z"
        fill="white"
      />
    </svg>
  );
}

export default PrizeArrowSvg;
