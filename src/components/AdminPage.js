import React, { useEffect, useContext } from "react";

import { sendAuthPostReq, sendGetReq } from "../services/api.service";
import UsersContext from "../context/users-context";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AdminPage = () => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const { user } = useContext(UsersContext);
  console.log("AdminPage---me", user);
  const token = user.token;
  useEffect(() => {
    async function fetchUsers() {
      const response = await sendGetReq(token, "/user/all");
      console.log("AdminPage--- response from sendGetReq", response);
      setUsers(response.body);
    }
    fetchUsers();
    console.log("AdminPage--- users state", users);
  }, []);

  const handleApprove = (userToApprove) => {
    sendAuthPostReq(token, "", `/user/approve/${userToApprove._id}`);
    console.log(
      "handleApprove---The user._id that you wish to edit ",
      userToApprove._id
    );
  };

  const handleEdit = (values) => {
    console.log("The Values that you wish to edit ", values);
  };

  const handleDelete = (values) => {
    console.log("The Values that you wish to edit ", values);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="admin table">
        <TableHead>
          <TableRow>
            <TableCell align="right">שם פרטי</TableCell>
            <TableCell align="right">שם משפחה</TableCell>
            <TableCell align="right">אימייל</TableCell>
            <TableCell align="right">טלפון</TableCell>
            <TableCell align="right">יישוב</TableCell>
            <TableCell align="right">סטטוס</TableCell>
            <TableCell align="right">פעולות לניהול משתמשים</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell component="th" scope="row" align="right">
                {user.firstName}
              </TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.phoneNum}</TableCell>
              <TableCell align="right">{user.community}</TableCell>
              <TableCell align="right">{user.status}</TableCell>
              <TableCell align="right">
                <Button
                  aria-label="approve"
                  color="primary"
                  onClick={() => handleApprove(user)}
                >
                  אישור
                </Button>
                <Button aria-label="edit" onClick={() => handleEdit(user)}>
                  <EditIcon />
                </Button>
                <Button aria-label="delete" onClick={() => handleDelete(user)}>
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { AdminPage as default };
