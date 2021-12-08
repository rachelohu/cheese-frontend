import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [cheese, setCheese] = useState(null);
  const URL = "https://protected-dusk-44066.herokuapp.com/cheese";

  const getCheese = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  const createCheese = async (cheese) => {
    // make post request to create cheese
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    // update list of cheese
    getCheese();
  };

  const updateCheese = async (cheese, id) => {
    // make put request to create cheese
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    })
    // update list of cheese
    getCheese()
  }

  const deleteCheese = async id => {
    // make delete request to create cheese
    await fetch(URL + id, {
      method: "delete",
    })
    // update list of cheese
    getCheese()
  }

  useEffect(() => getCheese(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index cheese={cheese} createCheese={createCheese} />
        </Route>
        <Route 
          path="/cheese/:id"
          render={(rp) => (
            <Show 
              {...rp}
              cheese={cheese}
              updateCheese={updateCheese}
              deleteCheese={deleteCheese}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;