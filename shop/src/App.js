import React, { useState, useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Jumbotron
} from "react-bootstrap";

import Cart from "./Cart"

import Data from "./data";
import Detail from "./Detail.js";
import axios from "axios";


export let stockContext = React.createContext(); // 같은 변수값을 공유할 범위를 생성해준다.

function App() {
  // useState를 사용할 때는 항상 import를 해야한다.
  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* 브라우저 콘솔창을 보면 warning이 뜬다. */}
            {/* Link 태그 안에 링크 넣으면 안 될 것 같다고 warning 띄우는 거임*/}
            {/* Link 태그 에러 해결하기 */}
            {/* Link처럼 써달라는 의미로 as 속성을 부여할 수 있다. */}
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              Detail
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>New Arrival!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">
            {/* 같은 값을 공유할 HTML을 범위로 감싸주기 */}
            {/* value={}공유하고 싶은 데이터 */}
            <stockContext.Provider value={stock}>
              {/* 감싼 컴포넌트는 props 없이 value={}에 해당하는 데이터를 쓸 수 있다. */}
              <div className="row">
                {shoes.map((data, i) => {
                  return <Card shoes={data} i={i} />;
                })}
              </div>
            </stockContext.Provider>
            {/* 같은 값을 공유할 HTML을 범위로 감싸주기 */}

            <button
              className="btn btn-primary"
              onClick={() => {
                // fetch("https://codingapple1.github.io/shop/data2.json") // fetch를 사용해도 axios와 거의 같음

                // 로딩중이라는 UI 띄우기

                axios
                  .get("https://codingapple1.github.io/shop/data2.json") // get 요청하는 코드
                  // 성공
                  .then((result) => {
                    // 로딩중이라는 UI 안보이게 처리
                    console.log(result.data);
                    setShoes([...shoes, ...result.data]); // spread - 완전히 독립된 카피본이 생성된다.
                  })
                  // 실패
                  .catch(() => {
                    // 로딩중이라는 UI 안보이게 처리
                    console.log("no");
                  });
                // axios.get(데이터 요청할 URL); // get 요청하는 코드
                // 새로고침 없이 데이터를 가져온다. <- Ajax를 쓰는 이유
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        {/* /:id => 아무 문자나 받을 수 있다는 URL 작명법*/}
        {/* 1. 콜론 뒤에 맘대로 작명 */}
        {/* 2. 여러개 사용 가능 */}
        
        <Route path="/detail/:id">
          <stockContext.Provider value={stock}>
            <Detail shoes={shoes} stock={stock} setStock={setStock} />
          </stockContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>


        <Route path="/:id">
          {/* 모든 문자 경로를 의미한다. */}
          <div>?????????????</div>
        </Route>
      </Switch>{" "}
      {/* Switch 컴포넌트: 라우터들이 중복매칭 되는 것을 방지한다. */}
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={props.i + ".jpg"} width="100%" alt="none" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
      <Test></Test>
    </div>
  );
}

function Test() {
  let stock = useContext(stockContext);

  return <p>{stock[0]}</p>;
}

export default App;
