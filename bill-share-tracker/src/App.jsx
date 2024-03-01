import { useState } from "react";
import FormSplitBill from "./components/FormSplitBill";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import Friendlist from "./components/Friendlist";


const initialFriends = [
  {
    id: 118836,
    name: "Arshad",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sujoy",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Mahabub",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(newFriend) {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
    setShowAddFriend((x) => !x);
  }

  function handleSelection(x) {
    setSelectedFriend((selected) => (selected?.id === x.id ? null : x));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(
      friends.map((fnd) =>
        fnd.id === selectedFriend.id
          ? { ...fnd, balance: fnd.balance + value }
          : fnd
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friendlist
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill friend={selectedFriend} onSpliteBill={handleSplitBill} />
      )}
    </div>
  );
}
