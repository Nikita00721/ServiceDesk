import React, { useState } from "react";

function Form() {
  const [requestType, setRequestType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleAddRequest = (e) => {
    e.preventDefault();

    // Отправка данных на сервер или другая логика обработки формы
    console.log({
      requestType,
      fullName,
      email,
      description
    });

    // Очистка полей формы
    setRequestType("");
    setFullName("");
    setEmail("");
    setDescription("");
  };

  return (
    <form onSubmit={handleAddRequest}>
      <label>
        Тип заявки:
        <select name="requestType" value={requestType} onChange={(e) => setRequestType(e.target.value)}>
          <option value="">Выберите тип заявки</option>
          <option value="Техническая поддержка">Техническая поддержка</option>
          <option value="Запрос на информацию">Запрос на информацию</option>
          <option value="Жалоба">Жалоба</option>
        </select>
      </label>
      <br />
      <label>
        ФИО:
        <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Описание заявки:
        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button type="submit">Сохранить</button>
    </form>
  );
}

export default Form;