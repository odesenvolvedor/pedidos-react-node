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
import productsService from '../../services/products.service';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Products() {
  const [rows, setRows] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  function goToAddProduct() {
    history.push('/produtos/adicionar');
  }

  useEffect(() => {
    setSubmitted(true);
    productsService
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
        onClick={goToAddProduct}
      >
        Adicionar Produto
      </Button>
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
              <TableCell align="left">Valor</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              submitted ? (
              <CircularProgress />
            ) : (rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="center">
                  <Button title="Editar">
                    <CreateIcon color="primary" />
                  </Button>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Products;
