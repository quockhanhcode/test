import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../../data.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Container from '@mui/material/Container';

const Api = () => {
  const [items, setItems] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    pagechange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    pagechange(0);
  };

  useEffect(() => {
    setItems(data);
  }, []);

  const deleteItem = (id) => {
    if (window.confirm("Are you sure?")) {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      console.log("đã xóa item "+ id);
    }
  };

  const addItem = () => {
    const newItem = { id: items.length + 1, name: `Item ${items.length + 1}` };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h1> Get Api</h1>
      <Container>
        <TableContainer component={Paper} sx={{ maxHeight: 600}}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">userId</TableCell>
                <TableCell align="center">title</TableCell>
                <TableCell align="center">Function</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(0, rowsPerPage).map((item) => (
                <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row"> {item.id} </TableCell>
                  <TableCell align="center">{item.userId}</TableCell>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteItem(item.id)} variant="contained" color="success" >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Container>
    </div>
  );
};

export default Api;
