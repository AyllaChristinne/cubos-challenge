import React from "react";
import "./index.scss";

interface CircleProgressProps {
  percent: string | 0 | undefined;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ percent }) => {
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
};
export default CircleProgress;
