import { queryAllByAltText } from "@testing-library/react";
import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const checkNumbers = (number) => {
    const aNumbers = [2, 3, 4];
    return aNumbers.includes(number) ? "человека" : "человек";
  };

  const handleDelete = (userId) => {
    const filteredUsers = users.filter((user) => {
      return user._id != userId;
    });
    setUsers(filteredUsers);
  };

  const renderPhrase = (number) => {
    if (number === 0) {
      return (
        <span className="badge bg-danger">
          Никто не тусанет с тобой сегодня
        </span>
      );
    } else if (number === 1) {
      return (
        <span className="badge bg-primary">
          Один человек тусанет с тобой сегодня
        </span>
      );
    }

    return (
      <span className="badge bg-primary">
        {number} {checkNumbers(number)} тусанут с тобой сегодня.
      </span>
    );
  };

  const qualityColorise = (quality) => {
    const classes = "badge bg-" + quality.color + " m-2";

    return (
      <span className={classes} key={quality._id}>
        {quality.name}
      </span>
    );
  };

  const renderRow = (user) => {
    return (
      <>
        <tr key={user._id}>
          <td scope="row">{user.name}</td>
          <td>{user.qualities.map((quality) => qualityColorise(quality))}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}/5</td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(user._id)}
            >
              Отказать
            </button>
          </td>
        </tr>
      </>
    );
  };

  const renderTable = () => {
    return (
      <>
        <h2>{renderPhrase(users.length)}</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{users.map((user) => renderRow(user))}</tbody>
        </table>
      </>
    );
  };

  return renderTable();
};

export default Users;
