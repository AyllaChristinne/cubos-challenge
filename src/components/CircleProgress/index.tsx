import "./index.scss";

interface CircleProgressProps {
  percent: string | number;
}

export function CircleProgress({ percent }: CircleProgressProps) {
  return (
    <div className="circle_container">
      <svg className="circle_progress" viewBox="0 0 36 36">
        <circle className="circle_background" cx="18" cy="18" r="16" />
        <circle
          className="circle_foreground"
          cx="18"
          cy="18"
          r="16"
          style={{ strokeDasharray: `${percent}, 100` }}
        />
      </svg>
      <span className="circle_text">
        <b>{percent}</b>%
      </span>
    </div>
  );
}
