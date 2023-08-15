import * as React from "react";
import type { Story } from "@ladle/react";
import { action } from "@ladle/react";

import Button from "./Button";

export const Default: Story = () => (
  <Button onClick={action("clicked")}>My Button</Button>
);

export const Success: Story = () => (
  <Button intent="success" onClick={action("clicked")}>
    My Button
  </Button>
);

export const Danger: Story = () => (
  <Button intent="danger" onClick={action("clicked")}>
    My Button
  </Button>
);

Danger.meta = {
  testWithSnapshot: true,
};
