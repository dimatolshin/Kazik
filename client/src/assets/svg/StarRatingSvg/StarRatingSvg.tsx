import { SvgProps } from "../../../types/SvgProps";

function StarRatingSvg({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 9.37609L8.16742 10.9894C8.65591 11.2851 9.25367 10.848 9.12512 10.2952L8.41809 7.26143L10.777 5.21748C11.2076 4.84468 10.9762 4.13766 10.4106 4.09266L7.30613 3.82914L6.09133 0.962463C5.8728 0.441834 5.1272 0.441834 4.90867 0.962463L3.69387 3.82271L0.589376 4.08624C0.0237545 4.13123 -0.207636 4.83826 0.223007 5.21105L2.58191 7.255L1.87488 10.2888C1.74633 10.8416 2.34409 11.2786 2.83258 10.983L5.5 9.37609Z"
        fill="#C9C000"
      />
    </svg>
  );
}

export default StarRatingSvg;
