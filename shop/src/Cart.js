import React from "react";
import Table from "react-bootstrap/Table";

function Cart() {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
// export를 하면 다른 파일에서 가져다 쓸 수 있다.
