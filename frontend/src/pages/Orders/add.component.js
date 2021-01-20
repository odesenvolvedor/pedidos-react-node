import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import productsService from '../../services/products.service';
import { useStyles } from '../../styles/material';

export default function AddOrder() {
  const history = useHistory();
  const [product, setOrder] = useState({
    name: '',
    price: '',
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
        if (err.path === 'price') {
          errorData.price = err.message;
        }
      });
      setErrors(errorData);
      console.log(errors);
    }
  };

  function onChangeName(e) {
    product.name = e.target.value;
  }

  function onChangePhone(e) {
    product.price = e.target.value;
  }

  function saveOrder() {
    clearErrors();
    product.birth_date = product.birthDate;
    setSubmitted(true);
    productsService
      .create(product)
      .then((response) => {
        setOrder(response.data);
        setSubmitted(false);
        history.push('/produtos');
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
              defaultValue={product.name}
              helperText={errors && errors.name ? errors.name : ''}
              error={errors && !!errors.name}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="price"
              required
              onChange={onChangePhone}
              name="price"
              label="Preço"
              defaultValue={product.price}
              helperText={errors && errors.price ? errors.price : ''}
              error={errors && !!errors.price}
              variant="outlined"
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
                onClick={saveOrder}
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
