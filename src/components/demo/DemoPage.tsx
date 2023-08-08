import * as React from "react";
import Card from "./Card";
import Button from "./Button";
import Center from "./Center";

interface Props {
  appName?: string;
}

const DemoPage: React.FC<Props> = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#fcfcfc",
        paddingBottom: 200,
        boxSizing: "border-box",
      }}
    >
      <Center>
        <h1>This is a demo page</h1>
        <Card width={300} height={106}>
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
    </div>
  );
};

export default DemoPage;
