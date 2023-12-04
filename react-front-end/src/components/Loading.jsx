import { PulseLoader } from "react-spinners";
import { useState } from "react";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  let [color, setColor] = useState("#084F20");
  let [loading, setLoading] = useState(true);

  return (
    <PulseLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )

}

export default Loading;