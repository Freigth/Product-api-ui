import "./App.css";
import Table from "./components/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import Add from "./components/Add";

function App() {
  const URL = "http://localhost:3000/api/v1/purchased-histories";
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => setPurchasedProducts(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mt-10">
      <Add setPurchasedProducts={setPurchasedProducts} />
      <Table
        purchasedProducts={purchasedProducts}
        setPurchasedProducts={setPurchasedProducts}
      />
    </div>
  );
}

export default App;
