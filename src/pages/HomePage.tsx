import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addCard, removeCard } from "../store/cardsSlice";

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  console.log(cards);
  // Redirect to sign in if not authenticated
  if (!user) {
    navigate("/signin");
    return null;
  }

  const handleAddCard = () => {
    if (title.trim()) {
      dispatch(addCard({ id: Date.now().toString(), title }));
      setTitle("");
    }
  };

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
      <h2>Your Cards</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card title"
      />
      <button onClick={handleAddCard}>Add Card</button>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            {card.title}
            <button onClick={() => dispatch(removeCard(card.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
