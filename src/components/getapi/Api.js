import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import data from "../../data.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Container from "@mui/material/Container";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
      console.log("đã xóa item " + id);
    }
  };

  const addItem = () => {
    const newItem = { id: items.length + 1, name: `Item ${items.length + 1}` };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h1> Get Api</h1>
      <Container sx={{ mt: 10 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>STT</StyledTableCell>
                <StyledTableCell align="center">userId</StyledTableCell>
                <StyledTableCell align="center">title</StyledTableCell>
                <StyledTableCell align="center">Function</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(0, rowsPerPage).map((item) => (
                <StyledTableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {" "}
                    {item.id}{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.userId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.title}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() => deleteItem(item.id)}
                      variant="contained"
                      color="success"
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
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
