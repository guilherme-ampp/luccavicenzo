/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Title, Form } from './style';

// declaring the function as a const we can type the object more easily
// React.FC = React.FunctionComponent
// Classes were the old way of creating component in React
const PasswordGateway: React.FC = () => {
  const [passphrase, setPassphrase] = useState('');
  const [inputError, setInputError] = useState('');

  const history = useHistory();

  async function handleEnterPassphrase(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!passphrase) {
      setInputError('Por favor entre a senha correta!');
    } else {
      setInputError('');
      history.push('/share');
    }
  }

  return (
    <>
      <Title> Bem-vindo </Title>
      <Form hasError={!!inputError} onSubmit={handleEnterPassphrase}>
        <input
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="Entre a senha!"
          type="password"
          maxLength={10}
        />

        <button type="submit">OK</button>
      </Form>
      {inputError && <span>${inputError}</span>}
    </>
  );
};

export default PasswordGateway;
