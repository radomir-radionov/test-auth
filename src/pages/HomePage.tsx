import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addCard, removeCard } from "../store/cardsSlice";
import axios from "axios";

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

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

  const API_URL = "http://localhost:3001/users";

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const createUser = async () => {
    if (!formData.name.trim()) return;
    await axios.post(API_URL, formData);
    setFormData({ name: "" });
    fetchUsers();
  };

  // Delete user
  const deleteUser = async (id: any) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  // Update user
  const updateUser = async () => {
    if (!formData.name.trim()) return;
    await axios.put(`${API_URL}/${editingUserId}`, formData);
    setEditingUserId(null);
    setFormData({ name: "" });
    fetchUsers();
  };

  const handleEdit = (user: any) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name });
  };

  return (
    <div>
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
      <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
        <h2>User Management</h2>

        <div>
          <input
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
          />
          <button onClick={editingUserId ? updateUser : createUser}>
            {editingUserId ? "Update" : "Add"}
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ marginTop: 10 }}>
              {user.name}
              <button
                onClick={() => handleEdit(user)}
                style={{ marginLeft: 10 }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                style={{ marginLeft: 5 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
