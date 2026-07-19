import React, { useState } from "react";

function Home() {
  const [name, setName]=useState('vcipul')
  console.log("hello")
  return (
    <div className="my-10 ">
      <h2>Home</h2>
      <h4>hello</h4>
      <p>{name}</p>
    </div>
  );
}

export default Home;
