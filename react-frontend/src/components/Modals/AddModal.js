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
          <h1 className="text-xl text-center text-black">Добавить заявку</h1>
                <div className="req">
      <form onSubmit={handleSubmit}>
        <div className='content'>
          <label>Тип заявки:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            <option value="">Выберите тип заявки</option>
            {requestTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

        </div>
        <div className='content'>
          <label>ФИО:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className='content'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='content'>
          <label>Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="btn-mod">
        <button className='sub' type="submit">Сохранить</button>
        </div>
        
      </form>
      </div>
    </div>
        </div>
    )

}
export default TypeModal