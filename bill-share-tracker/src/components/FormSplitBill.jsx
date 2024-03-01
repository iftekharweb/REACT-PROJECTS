import React, { useState } from "react";
import Button from "./Button";

const FormSplitBill = ({ friend, onSpliteBill }) => {
  const [bill, setBill] = useState("");
  const [payByUser, setPayByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const paidByFriend = bill ? bill - payByUser : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !payByUser) return;
    onSpliteBill(whoIsPaying === "user" ? paidByFriend : -payByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split A Bill with {friend.name}</h2>

      <label>😣 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🥵 Your Expence</label>
      <input
        type="text"
        value={payByUser}
        onChange={(e) =>
          setPayByUser(
            Number(e.target.value) > bill ? payByUser : Number(e.target.value)
          )
        }
      />

      <label>😴 {friend.name}'s Expence</label>
      <input type="text" value={paidByFriend} disabled />

      <label>🤡 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
};

export default FormSplitBill;
