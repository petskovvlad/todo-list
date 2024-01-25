import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const Task = ({ id, done, date, description, onChange, onDelete, onEdit }) => {
  return (
    <li className={classNames("list-item", { "list-item_done": done })}>
      <input
        className="list-item__checkbox"
        type="checkbox"
        defaultChecked={done}
        onChange={() => onChange(id)}
      />
      <div className="test-container">
        <span className="list-item__text">{description}</span>
        <span className="list-item__date">{`| Task date: ${date}`}</span>
      </div>
      <FontAwesomeIcon
        icon={faPenToSquare}
        className="list-item__edit-btn"
        onClick={() => onEdit({ id, done, date, description })}
      />
      <button
        className="list-item__delete-btn"
        onClick={() => onDelete(id)}
      ></button>
    </li>
  );
};

export default Task;
