import * as React from "react";
import "./reset-body-margin.css";
import Card from "./Card";
import Button from "./Button";
import Center from "./Center";

interface Props {
  appName?: string;
}

const DemoPage: React.FC<Props> = () => {
  const [count, setCount] = React.useState(0);

  return (
    <Center>
      <Card width={300} height={110}>
        <center>
          <p>Count is currently {count}.</p>
          <Button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            Click me!
          </Button>
        </center>
      </Card>
    </Center>
  );
};

export default DemoPage;
