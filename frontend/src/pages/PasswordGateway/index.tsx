/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, FormEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Title, Form, Message } from './style';
import { useAuth } from '../../hooks/auth';
import 'react-phone-number-input/style.css';

const PasswordGateway: React.FC = () => {
  const { signIn } = useAuth();
  const [phonenumber, setPhonenumber] = useState('');
  const [inputError, setInputError] = useState('');

  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setInputError('');

      try {
        const schema = Yup.object().shape({
          phonenumber: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate({ phonenumber }, { abortEarly: false });
        if (!isValidPhoneNumber(phonenumber)) {
          setInputError('Por favor, entre um número de telefone válido!');
        } else {
          await signIn({ phonenumber });
          history.push('/share');
        }
      } catch (err) {
        setInputError(`Whoops! ${err}`);
      }
    },
    [signIn, phonenumber, history],
  );

  return (
    <>
      <Title> Bem-vindo </Title>
      <Form hasError={!!inputError} onSubmit={handleSubmit}>
        <PhoneInput
          defaultCountry="BR"
          countries={['BR', 'US', 'DK']}
          addInternationalOption={false}
          placeholder="Número de telefone"
          value={phonenumber}
          onChange={setPhonenumber}
        />

        <button type="submit">OK</button>
      </Form>

      {inputError && <Message>{inputError}</Message>}
    </>
  );
};

export default PasswordGateway;
