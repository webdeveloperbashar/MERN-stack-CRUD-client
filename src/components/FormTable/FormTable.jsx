import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
function Form() {
  const button = document.getElementById("button");
  const form = document.getElementById("my-form");
  const [dbValue, setDbValue] = useState([]);
  const [values, setValues] = useState({
    name: "",
    salary: "",
    profession: "",
    days: "",
  });
  const handleChange = (e) => {
    const value = { ...values };
    value[e.target.name] = e.target.value;
    setValues(value);
  };
  const clearForm = () => {
    setValues({
      name: "",
      salary: "",
      profession: "",
      days: "",
    });
  };

  // Data read function
  useEffect(() => {
    fetch(`https://whispering-brook-76420.herokuapp.com/salaries`)
      .then((res) => res.json())
      .then((data) => setDbValue(data));
  }, []);

  // Data Post function
  const handleSubmit = (e) => {
    e.preventDefault();
    button.innerText = "Submit";
    form.nodeValue = "";
    clearForm();
    fetch(`https://whispering-brook-76420.herokuapp.com/salaries`, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(values),
    })
    .then(() => {
      fetch(`https://whispering-brook-76420.herokuapp.com/salaries`)
        .then((res) => res.json())
        .then((data) => setDbValue(data));
    });
  };
  // Delete function
  const handleDelete = (id) => {
    fetch(`https://whispering-brook-76420.herokuapp.com/salaries/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(values),
    }).then(() => {
      fetch(`https://whispering-brook-76420.herokuapp.com/salaries`)
        .then((res) => res.json())
        .then((data) => setDbValue(data));
    });
  };
  // Update function
  const handleEdit = (id) => {
    const getValue = dbValue.find((el) => el._id === id);
    const { name, salary, profession, days } = getValue;
    setValues({
      name: name,
      salary: salary,
      profession: profession,
      days: days,
      id: id,
    });
    button.innerText = "Update";
  };

  return (
    <div>
      <Container>
        <Grid>
          <Paper>
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Salary Distribution
            </Typography>
          </Paper>
        </Grid>
        <Grid style={{ marginTop: "20px" }}>
          <Paper style={{ padding: "20px" }}>
            <form
              action="/salaries"
              id="my-form"
              method="POST"
              onSubmit={handleSubmit}
            >
              <TextField
                type="text"
                label="Enter Your Name"
                variant="outlined"
                name="name"
                value={values.name}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <TextField
                type="number"
                label="Enter Your Salary"
                variant="outlined"
                name="salary"
                value={values.salary}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <TextField
                type="text"
                label="Enter Your Profession"
                variant="outlined"
                name="profession"
                value={values.profession}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <TextField
                type="number"
                label="Enter Your Work Days"
                variant="outlined"
                name="days"
                value={values.days}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <Button
                type="submit"
                style={{ fontSize: "18px", padding: '12px' }}
                variant="contained"
                color="primary"
                id="button"
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Salary
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Profession
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Work Days
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dbValue.map((value) => (
                <TableRow key={value._id}>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    {value.name}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    ${value.salary}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    {value.profession}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    {value.days}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEdit(value._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(value._id)}
                      variant="contained"
                      color="primary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Form;
