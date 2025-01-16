interface IProps {
  className: string;
}

export function ChevronDownIcon({ className }: IProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M18 9L12 15L6 9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
