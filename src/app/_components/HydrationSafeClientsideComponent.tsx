import React from "react";

export function HydrationSafeClientsideComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState<boolean>();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return <>{children}</>;
}
