import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';
import ordersService from '../../services/orders.service';
import { CenterContainer } from '../../components';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Orders() {
  const [rows, setRows] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  function goToAddOrder() {
    history.push('/pedidos/adicionar');
  }

  useEffect(() => {
    setSubmitted(true);
    ordersService
      .getAll()
      .then((response) => {
        setRows(response.data.data);
        setSubmitted(false);
      })
      .catch((e) => {
        console.log(e);
        setSubmitted(false);
      });
  }, []);

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={goToAddOrder}
      >
        Adicionar Pedido
      </Button>
      <h1>Pedidos</h1>
      {submitted ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Número do Pedido</TableCell>
                <TableCell align="left">Cliente</TableCell>
                <TableCell align="left">Valor Total</TableCell>
                <TableCell align="left">Data</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.order_number}
                    </TableCell>
                    <TableCell align="left">{row.customer.name}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button title="Editar">
                        <CreateIcon color="primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <CenterContainer>
                    <Typography variant="h5" component="h6">
                      Nenhum Pedido Encontrado
                    </Typography>
                  </CenterContainer>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Orders;
