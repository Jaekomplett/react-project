import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
// styled-component의 장점
// 컴포넌트가 많아지더라도 class 겹칠 일이 없다.
// import '/Detail.css'; // CSS 파일을 적용
import "./Detail.scss"; // SCSS 파일을 적용해줘야 함.
import { stockContext } from "./App";
import { Nav } from "react-bootstrap";

let Box = styled.div`
  // CSS를 미리 입혀놓은 컴포넌트
  margin: 20px; // className 작명 필요없음
`;

let Title = styled.h4`
  // 색깔만 다른 제목이 여러개 필요하다면?
  font-size: 25px;
  color: ${(props) => props.Color};
`;

function Detail(props) {
  // useEffect 기본 실행 형태
  // 컴포넌트가 mount 되었을 때, update 될 떄
  // 특정 코드를 실행할 수 있다.

  let [alert, setAlert] = useState(true);
  let [inputValue, setInputValue] = useState("");
  let stock = useContext(stockContext);

  let [clickTap, setClickTap] = useState(0);

  // useEffect Hook 1.
  useEffect(() => {
    // 몇 초 후에 alert 창을 안 보이게 해보자
    // setTimeout 함수는 보통 변수에 할당해서 많이 쓴다.
    let Timer = setTimeout(() => {
      setAlert(false);
    }, 5000);
    // alert 안 보이게 해줘
    return () => {
      clearTimeout(Timer);
    };
    // return을 쓰면 <Detail> 이 사라질 때 코드가 실행된다. (버그, 에러 방지)
  }, [alert]);
  // (1) useEffect 훅 마지막에 [] 를 입력하면?
  // 컴포넌트 페이지 처음 시작했을 때만 실행하고 끝남.
  // 음? 쇼핑몰 이벤트 페이지 처음 들어갔을 때 팝업창으로 쓰려나?

  // (2) 대괄호 안에 state를 입력하면?
  // 1. update 될 때마다 useEffect가 실행되는 것을 방지한다. (자원낭비 막기)
  // 2. alert라는 state가 변경이 될때만 실행한다.
  // 3. [] 안에 원하는 state 전부 다 넣을 수 있다.
  //

  // useEffect Hook 2.
  // 컴포넌트가 사라질 때 코드를 실행시킬 수 있다.
  // e.g.) 다른 페이지로 이동할 때
  // <unmount>
  // return function 어쩌구(){실행할 코드}

  // useEffect Hook 3.
  // 여러 개를 사용하고 싶을 때
  // useEffect 훅 body 안에 함수 여러 개를 집어넣기
  // or useEffect 훅을 여러 개 쓰기
  // useEffect(() => {
  //   함수
  //   함수
  //   함수
  // })

  //useEffect Hook 4.

  // 함수를 쓰면 {} 가 생성된다. 이 {} 안에 id: 1,2,3 이 기록된다.
  let { id } = useParams();
  let history = useHistory(); // 방문 기록을 저장해두는 Object

  return (
    <div className="container">
      <Box>
        {/* 
        props 문법 두 가지
        보낼이름={변수명}
        보낼이름="일반문자"
        */}
        {/* <Title Color={"white"}>상세페이지</Title> */}
        {/* <Title Color="red">상세페이지</Title> */}
        <Title className="detail">Detail</Title>
      </Box>
      {/* input에 입력할 때마다 update(재렌더링)이 된다. */}
      {inputValue}
      <input onChange={(e) => setInputValue(e.target.value)} />

      {alert === true ? (
        <div className="my-alert">
          <p>out of stock</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
            alt="none"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p>

          <Info stock={props.stock} setStock={props.setStock}></Info>

          <button
            className="btn btn-danger"
            onClick={() => {
              let copyStock = [props.stock[0]];
              copyStock = copyStock--;
              props.setStock(copyStock);
              console.log(copyStock);
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      {/* UI 만드는 법 
      1. UI 상태를 true/false state로 저장
      state에 따라 UI on/off */}

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        {/* defaultActiveKey="기본으로 눌러진 버튼의 evenyKey 입력하기" */}
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {
            setClickTap(0)
          }}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {
            setClickTap(1)
          }}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 탭 내용 div 생성 */}
      {/* props 전달해주기 위해 state 적용 */}
      <TabContent clickTap={clickTap} />


    </div>
  );
}

function TabContent(props){
  if (props.clickTap === 0){
    return <div>0번째 내용</div>
  } else if (props.clickTap === 1){
    return <div>1번째 내용</div>
  }
}


// 디테일 컴포넌트와 데이터 바인딩
function Info(props) {
  return <p>재고 : {props.stock} </p>;
}


export default Detail;
// Detail 함수를 export 한다.
