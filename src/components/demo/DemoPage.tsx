import * as React from "react";
import Button from "./Button";

interface Props {
  appName?: string;
}

const DemoPage: React.FC<Props> = () => {
  return (
    <div>
      <Button>Button</Button>
      <br />
      <br />
      <Button intent="primary">Primary</Button>
      <br />
      <br />
      <Button intent="success">Success</Button>
      <br />
      <br />
      <Button intent="warning">Warning</Button>
      <br />
      <br />
      <Button intent="danger">Danger</Button>
    </div>
  );
};

export default DemoPage;
