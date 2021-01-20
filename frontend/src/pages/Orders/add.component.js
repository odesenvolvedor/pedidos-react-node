import { Backdrop, Box, Button, CircularProgress, Divider, Fade, Modal, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import customersService from '../../services/customers.service';
import ordersService from '../../services/orders.service';
import productsService from '../../services/products.service';
import { useStyles } from '../../styles/material';
import { CenterContainer } from '../../components';

export default function AddOrder() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState({
    customer_id: '',
    amount: '',
    order_items: '',
  });
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(0.00);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearErrors = () => {
    setErrors({});
  };

  useEffect(() => {
    customersService
      .getAll()
      .then((response) => {
        setCustomers(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    productsService
      .getAll()
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleErrors = (e) => {
    if (e.response && e.response.data && e.response.data.errors) {
      const errorData = {};
      e.response.data.errors.forEach((err) => {
        switch (err.path) {
          case 'customer_id':
            errorData.customer_id = err.message;
            break;
          case 'amount':
            errorData.amount = err.message;
            break;
          default:
            break;
        }
      });
      setErrors(errorData);
      console.log(errors);
    }
  };

  function onChangeName(e, n) {
    setCustomer(n);
    order.customer_id = customer.id;
    console.log(n)
  }

  function onChangeProduct(e, n) {
    if (n) {
      if (!product) {
        setProduct(n);
      } else {
        product.id = n.id;
        product.name = n.name;
        product.price = n.price;
        setProduct(product);
      }
    }

  }

  function onChangeProductQuantity(e) {
    if (!product) setProduct({ quantity: e.target.value })
    else product.quantity = e.target.value;
  }

  function productAdd() {

    if (!order || !order.order_items)
      order.order_items = [product]
    else
      order.order_items.push(product);

    setOrder(order);
    setProduct(product);

    let total = amount;

    order.order_items.forEach(item => {
      total += (item.quantity * item.price);
    })


    setAmount(total);


  }

  function saveOrder() {
    clearErrors();
    order.birth_date = order.order_items;
    setSubmitted(true);
    ordersService
      .create(order)
      .then((response) => {
        setOrder(response.data);
        setSubmitted(false);
        history.push('/pedidos');
      })
      .catch((e) => {
        setSubmitted(false);
        handleErrors(e);
      });
  }

  const classes = useStyles();

  return (

    <form className={classes.root} noValidate autoComplete="off">

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Adiciona um produto</h2>
            <Box display="flex" flexWrap="wrap" width="100%">
              <Autocomplete
                id="combo-box-demo"
                options={products}
                getOptionLabel={(option) => option ? `${option.name} - ${option.price}` : ''}
                onChange={onChangeProduct}
                value={product}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Produto"
                    defaultValue={product ? `${product.name} - ${product.price}` : ''}
                    helperText={errors && errors.product ? errors.product : ''}
                    error={errors && !!errors.product}
                    variant="outlined"
                  />
                )}
              />
              <TextField
                id="quantity"
                onChange={onChangeProductQuantity}
                customer_id="quantity"
                label="Quantidade"
                helperText={errors && errors.quantity ? errors.quantity : ''}
                error={errors && !!errors.quantity}
                variant="outlined"
              />
            </Box>
            <Box>
              <Button onClick={productAdd}>Confirmar</Button>
            </Box>
          </div>
        </Fade>
      </Modal>

      <div>
        <Box display="flex" flexWrap="wrap" width="100%">
          <Autocomplete
            id="combo-box-demo"
            options={customers}
            getOptionLabel={(option) => option ? option.name : ''}
            onChange={onChangeName}
            value={customer}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cliente"
                defaultValue={customer ? customer.name : ''}
                helperText={
                  errors && errors.customer_id ? errors.customer_id : ''
                }
                error={errors && !!errors.customer_id}
                variant="outlined"
              />
            )}
          />
          <TextField
            id="amount"
            disabled
            customer_id="amount"
            label="Valor total"
            defaultValue={parseFloat(amount).toFixed(2)}
            helperText={errors && errors.amount ? errors.amount : ''}
            error={errors && !!errors.amount}
            variant="outlined"
          />
        </Box>
        <Divider style={{ marginTop: '30px' }}/>
        <Box width="100%" style={{ marginTop: '30px' }}>
          <button type="button" onClick={handleOpen}>
            Adicionar Produto
          </button>
          Nenhum produto

          <h1>Produtos</h1>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>#ID</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">quantidade</TableCell>
                  <TableCell align="left">Valor</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!order || !order.order_items ? (
                  <TableRow>
                    <CenterContainer>
                      <Typography variant="h5" component="h6">
                        Nenhum produto adicionado
                    </Typography>
                    </CenterContainer>
                  </TableRow>
                ) : (
                    order.order_items.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">{parseFloat(row.quantity * row.price).toFixed(2)}</TableCell>
                        <TableCell align="center">
                          <Button title="Editar">
                            <CreateIcon color="primary" />
                          </Button>
                          <Button title="Remover">
                            <DeleteIcon color="primary" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box width="100%" style={{ marginTop: '30px' }}>
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
        </Box>
      </div>
    </form>
  );
}
