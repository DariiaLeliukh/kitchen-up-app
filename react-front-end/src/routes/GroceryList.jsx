import React from "react";

const GroceryList = () => {

  // Hardcoded fake grocery list data
  const fakeGroceryList = [
    { id: 1, ingredient: "ingredient1", quantity: 2, unit: "units" },
    { id: 2, ingredient: "ingredient2", quantity: 500, unit: "grams" },
    { id: 3, ingredient: "ingredient3", quantity: 4, unit: "litre" }
  ];

  return (
    <div>
      <h2>Grocery List</h2>
      <ul>
        {fakeGroceryList.map((item) => (
          <li key={item.id}>
            {item.quantity} {item.unit} - {item.ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
