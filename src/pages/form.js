import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  message: '',
  attachedFile: {},
}
const FileForm = () => {
  const [formState, setFormState] = useState(INITIAL_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newState = Object.assign({}, formState);
    const formData = new FormData();
    formData.append('attachedFile', newState.attachedFile);
    formData.append('name', newState.name);
    formData.append('email', newState.email);
    formData.append('phone', newState.phone);
    formData.append('message', newState.message);
    
    try {
      const { data } = await axios.post('http://localhost:3001/recordContact', `${formData}`, {
        headers: { 'Content-Type': 'multipart/form-data; application/json; charset=utf-8' },
      });
      console.log(data);

      return data
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const handleFile = (e) => {
    const copyState = Object.assign({}, formState);
    setFormState({ ...copyState, attachedFile: e.target.files[0] });
  };
  
  const handleChange = (e) => {
    console.log(formState);
    const { name, value } = e.target;
    const copyState = Object.assign({}, formState);
    setFormState({ ...copyState, [name]: value });
  };


  return (

    <form className="container-form" onSubmit={ handleSubmit }>
      <p>Envie seus dados</p>
      <div className="content-form">
      <p>Nome</p>
        <input
          name="name"
          type="text"
          className="input-fields"
          onChange={ handleChange }
          placeholder="digite o seu nome"
        />
        <p>Email</p>
        <input
          name="email"
          type="email"
          className="input-fields"
          onChange={ handleChange }
          placeholder="email@email.com"
          />
        <p>Número de telefone</p>
        <input
          name="phone"
          type="text"
          className="input-fields"
          onChange={ handleChange }
          placeholder="00 00000-0000"
        />
        <p>Mensagem</p>
        <textarea
          name="message"
          type="textarea"
          onChange={ handleChange }
          className="input-fields"
        />
        <p>Anexar arquivo</p>
        <input
          name="attachedFile"
          type="file"
          onChange={ handleFile }
          className="input-fields"
        />
        <button
          name="enviar"
          type="submit"
          className="btn-form"
        >
          ENVIAR
        </button>
      </div>
    </form>
  );
};

export default FileForm;
