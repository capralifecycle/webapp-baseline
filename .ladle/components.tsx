import React from "react";
import type { GlobalProvider } from "@ladle/react";

export const Provider: GlobalProvider = ({
  children,
}) => (
  <>
    {children}
  </>
);
