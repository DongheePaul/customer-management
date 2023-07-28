import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MemberDelete from "./MemberDelete";

class MemberTable extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img src={this.props.image} height="200" width="200" alt="profile" />
        </TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.password}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell>
          <MemberDelete
            stateRefresh={this.props.stateRefresh}
            id={this.props.id}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default MemberTable;
