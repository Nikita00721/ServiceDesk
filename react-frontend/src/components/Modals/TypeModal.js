import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";


const TypeModal=({index,
    closeModal,
    newType,
    updatedType,
    handleInputChange,
    handleInputUpdateChange,
    handleSubmit,
    handleFormSubmit,

})=>{

    return (
        <div className="wrapper h-screen w-screen">
          <div className="modal border-double">
            <div
              className="btn-close"
              onClick={closeModal}
              onKeyDown={closeModal}
              tabIndex={0}
            >
              <AiOutlineCloseCircle size={20} className="cursor-pointer" />
            </div>
            {
              index == -1 ? (
                <div>
                  <h1 className="text-xl text-center text-black">Добавить тип заявки</h1>
                  <div className="req">
                    <form onSubmit={handleSubmit}>
                      <div className="content">
                        <label>Название:</label>
                        <input
                          type="text"
                          name="name"
                          value={newType.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="content">
                        <label>Описание:</label>
                        <textarea
                          name="description"
                          value={newType.description}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                      <div className="btn-mod">
                        <button className="sub" type="submit">
                          Добавить
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-xl text-center text-black">Редактирование типа</h1>
                  <div className="req">
                    <form onSubmit={handleFormSubmit}>
                      <div className="content">
                        <label>Название:</label>
                        <input
                          type="text"
                          name="name"
                          value={updatedType.name}
                          onChange={handleInputUpdateChange}
                          required
                        />
                      </div>
                      <div className="content">
                        <label>Описание:</label>
                        <textarea
                          name="description"
                          value={updatedType.description}
                          onChange={handleInputUpdateChange}
                          required
                        ></textarea>
                      </div>
                      <div className="btn-mod">
                        <button className="sub" type="submit">
                          Сохранить
                        </button>
                      </div>
                    </form>
                  </div>
                </div>)}

          </div>
          </div>
    )

}
export default TypeModal