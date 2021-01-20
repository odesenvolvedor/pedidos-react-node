import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import customersService from '../../services/customers.service';
import { useStyles } from '../../styles/material';

export default function AddCustomer() {
  const history = useHistory();
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    birthDate: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const clearErrors = () => {
    setErrors({});
  };

  const handleErrors = (e) => {
    if (e.response && e.response.data && e.response.data.errors) {
      const errorData = {};
      e.response.data.errors.forEach((err) => {
        if (err.path === 'name') {
          errorData.name = err.message;
        }
        if (err.path === 'phone') {
          errorData.phone = err.message;
        }
        if (err.path === 'birth_date') {
          errorData.birthDate = err.message;
        }
      });
      setErrors(errorData);
      console.log(errors);
    }
  };

  function onChangeName(e) {
    customer.name = e.target.value;
  }

  function onChangePhone(e) {
    customer.phone = e.target.value;
  }

  function onChangeBirthDate(e) {
    customer.birthDate = e.target.value;
  }

  function saveCustomer() {
    clearErrors();
    customer.birth_date = customer.birthDate;
    setSubmitted(true);
    customersService
      .create(customer)
      .then((response) => {
        setCustomer(response.data);
        setSubmitted(false);
        history.push('/clientes');
      })
      .catch((e) => {
        setSubmitted(false);
        handleErrors(e);
      });
  }

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="submit-form">
        <div>
          <div>
            <TextField
              id="name"
              required
              onChange={onChangeName}
              name="name"
              label="Nome"
              defaultValue={customer.name}
              helperText={errors && errors.name ? errors.name : ''}
              error={errors && !!errors.name}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="phone"
              required
              onChange={onChangePhone}
              name="phone"
              label="Telefone"
              defaultValue={customer.phone}
              helperText={errors && errors.phone ? errors.phone : ''}
              error={errors && !!errors.phone}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              type="date"
              id="birthDate"
              required
              onChange={onChangeBirthDate}
              name="birthDate"
              label="Data de Nascimento"
              defaultValue={customer.birthDate}
              helperText={errors && errors.birthDate ? errors.birthDate : ''}
              error={errors && !!errors.birthDate}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            {submitted ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={saveCustomer}
              >
                Salvar
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
