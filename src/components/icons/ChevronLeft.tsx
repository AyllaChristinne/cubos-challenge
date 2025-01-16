interface IProps {
  className?: string;
}

export function ChevronLeftIcon({ className }: IProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}