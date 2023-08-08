import * as React from "react";
import type { Story } from "@ladle/react";

import Card from "./Card";

export const DefaultStory: Story = () => {
  return (
    <>
      <Card width={200} height={100}>
        Neutral
      </Card>
      <br />
      <Card intent="primary" width={200} height={100}>
        Primary color
      </Card>
      <br />
      <Card intent="warning" width={200} height={100}>
        This is a warning
      </Card>
      <br />
      <Card intent="success" width={200} height={100}>
        Something succeeded
      </Card>
      <br />
      <Card intent="danger" width={200} height={100}>
        Something failed
      </Card>
    </>
  );
};
