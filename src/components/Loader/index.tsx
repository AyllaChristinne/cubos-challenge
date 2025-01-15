import { useEffect } from "react";
import "./index.scss";

export function Loader() {
  useEffect(() => {
    console.log("LOADER");
  });

  return (
    <div className="loader_container">
      <span className="loader"></span>
    </div>
  );
}
