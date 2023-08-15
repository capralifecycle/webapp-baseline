import * as React from "react";
import type { Story } from "@ladle/react";

import DemoPage from "./DemoPage";

export const DefaultStory: Story = () => {
  return (
    <>
      <DemoPage />
    </>
  );
};

DefaultStory.meta = { iframed: true };
