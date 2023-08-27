import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const GetApis = async () => {
  try {
    const response = await axios.get(
      "https://64eaee50e51e1e82c576d9fa.mockapi.io/data/data"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Api = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    GetApis().then((data) => {
      setItems(data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const deleteItem = (id) => {
  //   // if (window.confirm("Are you sure?")) {
  //   //   const newItems = items.filter((item) => item.id !== id);
  //   //   setItems(newItems);
  //   //   console.log("Deleted item with id: " + id);
  //   // }
  //   try {
  //     const deleteSms = await fetch(`http://localhost:5000/sms/student/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         jwt_token: localStorage.token
  //       }
  //     });

  //     setSms(sms.filter(student => student.student_id !== id));

  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const deleteItem = async id => {
    try {
      const deleteItem = await fetch(`https://64eaee50e51e1e82c576d9fa.mockapi.io/data/data/${id}`, {
        method: "DELETE",
        headers: {
          jwt_token: localStorage.token
        }
      });

      setItems(items.filter(student => student.student_id !== id));
      console.log("Deleted item with id: " + id);

    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <div>
      <h1>Get Api</h1>
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
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.stt}
                    </StyledTableCell>
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
