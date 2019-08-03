import React, { useState } from "react";
import Button from "./Button/Button";

export default function Home({ onStart }) {

    
  return (
    <div className="home-wrapper">
      <h1>
        The amazing adventures of the highly colorized falling squares and a
        bottom bar
      </h1>
      <input onChange={e =>} />
      <Button onClick={() => setTimeout(onStart, 1000)}>Start game</Button>
    </div>
  );
}
