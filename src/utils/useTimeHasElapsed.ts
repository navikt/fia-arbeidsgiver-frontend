import React from "react";

export default function useTimeHasElapsed(time: number) {
  const [hasElapsed, setHasElapsed] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        setHasElapsed(true);
      } catch (e) {
        // Ignore
      }
    }, time);
  });

  return hasElapsed;
}
