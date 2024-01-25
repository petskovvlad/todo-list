import React from "react";

const Modal = ({
  formData,
  slotModalHandler,
  handleInputChange,
  handleSubmit,
  handleEdit,
  editingTask,
}) => {
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={slotModalHandler}
          >
            +
          </button>
          <form className="event-form">
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleInputChange}
                value={formData.date}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleInputChange}
              value={formData.description}
            ></textarea>
            {editingTask !== null ? (
              <button
                type="submit"
                className="event-form__submit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(formData.id, formData);
                }}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="event-form__submit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, formData.id);
                }}
              >
                Create
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
