import { SvgProps } from "../../../types/SvgProps";

function ArrowSvg({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.201362 14.4603C-0.0671206 14.1918 -0.0671206 13.7565 0.201362 13.488L6.36102 7.32835L0.201362 1.16863C-0.0671206 0.900134 -0.0671206 0.4649 0.201362 0.196408C0.469844 -0.0720835 0.905151 -0.0720835 1.17363 0.196408L7.81944 6.84224C8.08793 7.11073 8.08793 7.54597 7.81944 7.81446L1.17363 14.4603C0.905151 14.7288 0.469844 14.7288 0.201362 14.4603Z"
        fill="white"
      />
    </svg>
  );
}

export default ArrowSvg;
