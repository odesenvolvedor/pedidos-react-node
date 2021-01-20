import { Button, CircularProgress, Container } from '@material-ui/core';
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
import customersService from '../../services/customers.service';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Customers() {
  const [rows, setRows] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  function goToAddCustomer() {
    history.push('/clientes/adicionar');
  }

  useEffect(() => {
    setSubmitted(true);
    customersService
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
        onClick={goToAddCustomer}
      >
        Adicionar Cliente
      </Button>
      <h1>Clientes</h1>
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
              <TableCell align="left">Telefone</TableCell>
              <TableCell align="left">Data de Nascimento</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submitted ? (
              <CircularProgress />
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="center">
                    {new Date(row.birth_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button title="Editar">
                      <CreateIcon color="primary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Customers;
