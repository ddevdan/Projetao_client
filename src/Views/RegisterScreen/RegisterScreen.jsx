import React, { useState } from 'react';
import './RegisterScreen.css';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ReactLoading from 'react-loading';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuth } from '../../firebase';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleChange = (event) => {
    setTypeOfUser(event.target.value);
  };

  const { signUp } = useAuth()

  const handleSignup = () => {
    setIsLoading(true);
    clearErrors();
    signUp(name, contact, typeOfUser, email, password).then((data) => {
      switch (data) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(data);
          setIsLoading(false);
          break;
        case "auth/weak-password":
          setPasswordError(data);
          setIsLoading(false);
          break;
        default:
          setShouldRedirectToLogin(true);
          break;
      }
    })
  }

  if (shouldRedirectToLogin) {
    return (
      <Redirect push to="/" />
    );
  }


  return (
    <div className='register-screen'>
      <div className='register-box-style'>
        <p className='label-register-box-style'>Nome</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          onChange={(value) => setName(value.target.value)}
        />
      </div>
      <div className='register-box-style'>
        <p className='label-register-box-style'>Email</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          onChange={(value) => setEmail(value.target.value)}
        />
        <p>{emailError}</p>
      </div>
      <div className='register-box-style'>
        <p className='label-register-box-style'>Senha</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          onChange={(value) => setPassword(value.target.value)}
        />
        <p>{passwordError}</p>
      </div>
      <div className='register-box-style'>
        <p className='label-register-box-style'>Contato</p>
        <TextField
          required
          fullWidth
          margin='normal'
          id="outlined-required"
          onChange={(value) => setContact(value.target.value)}
        />
      </div>
      <div className='register-box-select-option-style'>
        <FormControl variant='standard' fullWidth>
          <InputLabel id="demo-simple-select-label">Você é segurança ou lojista?</InputLabel>
          <Select
            id="demo-simple-select"
            value={typeOfUser}
            onChange={handleChange}
          >
            <MenuItem value={'guard'}>Segurança</MenuItem>
            <MenuItem value={'shopman'}>Lojista</MenuItem>
          </Select>
        </FormControl>
      </div>






      {isLoading ? (
        <ReactLoading className='loading-login-screen-style' type='bars' color='#09629E' height={'20%'} width={'20%'} />
      ) : (
        <button onClick={handleSignup} className="create-account-button">Cadastrar</button>
      )}
    </div>
  );
};

export default RegisterScreen;