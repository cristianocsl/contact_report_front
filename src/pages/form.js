import axios from 'axios';
import React, { useEffect } from 'react';

import './styles.css';

const FileForm = () => {

  useEffect(() => {
    async function fetchData() {
      const customer = JSON.parse(localStorage.getItem('user'));
      if (customer) {
        const { data } = await axios.get('http://localhost:3001/login/token', {
          headers: { authorization: customer.token },
        });
      }
    }
    fetchData();
  }, []);

  const postMethod = async () => {};
  const getMethod = async () => {};


  return (
    <form className="container-form">
      <p>Envie seus dados</p>
      <div className="content-form">
      <p>Nome</p>
        <input
          name="name"
          type="text"
          className="input-fields"
          placeholder="digite o seu nome"
        />
        <p>Email</p>
        <input
          name="email"
          type="email"
          className="input-fields"
          placeholder="email@email.com"
          />
        <p>Número de telefone</p>
        <input
          name="phone"
          type="text"
          className="input-fields"
          placeholder="00 00000-0000"
        />
        <p>Mensagem</p>
        <textarea
          name="message"
          type="textarea"
          className="input-fields"
        />
        <p>Anexar arquivo</p>
        <input
          name="file"
          type="file"
          className="input-fields"
        />
        <button
          name="enviar"
          type="button"
          className="btn-form"
        >
          ENVIAR
        </button>
      </div>
    </form>
  );
};

export default FileForm;
