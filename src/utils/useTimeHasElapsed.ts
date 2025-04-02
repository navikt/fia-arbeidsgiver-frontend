import React from "react";

export default function useTimeHasElapsed(time: number) {
  const [hasElapsed, setHasElapsed] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        setHasElapsed(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Ignore
      }
    }, time);
  });

  return hasElapsed;
}
