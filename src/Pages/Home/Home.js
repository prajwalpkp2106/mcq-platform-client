import React from "react";
import { Card, Button } from "antd";
export default function Home() {
  return (
    <>
      <Card
        style={{
          margin: "30px",
          marginTop: "20px",
          border: "1px solid black",
          padding: "5px 5px",
        }}
      >
        Inner Card content
        <Button type="primary" style={{ float: "right" }}>
          Primary Button
        </Button>
      </Card>

      <Card
        style={{
          margin: "30px",
          marginTop: "20px",
          border: "1px solid black",
          padding: "10px 5px",
        }}
      >
        Inner Card content
      </Card>
    </>
  );
}
