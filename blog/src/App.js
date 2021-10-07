import React, { useState } from "react";
import "./App.css";

function App() {
  let today = new Date();
  let showToday = today.toLocaleDateString("ko");

  // 1. 기존 state 카피본 생성
  // 2. 카피본에 수정사항 반영
  // 3. 변경함수()에 집어넣기
  // function otherContent() {
  //   let newArray = [...content]; // spread operator 사용 => content에 담긴 요소들을 초기화하고 다시 담는다.
  //   newArray[0] = 'changed Content';
  //   setContent(newArray);   // state를 아예 대체해주는 함수
  // }

  // 좋아요 버튼 state
  let [like, setLike] = useState(0)

  // State
  // useState 함수를 사용하면 배열을 생성할 수 있다.
  // a: '주변 명소 추천' state 함수가 들어간다.
  // b: '주변 명소 추천' state를 변경해주는 함수가 들어간다.
  // destructuring 구조분해할당 방식으로 쓰였다.

  // 컨텐트 목록 state
  let [content, setContent] = useState(["Outer", "Top", "Bottom"]);

  // 2. Modal 창 state
  let [modal, modalChange] = useState(false);
  
  // 3. 누른 제목으로 변경
  let [title, titleChange] = useState(0);

  // 4. 입력값 state
  let [inputValue, setInputValue] = useState('');

  // 정렬 버튼 state
  function sorting() {
    let sortedArr = [...content];
    setContent(sortedArr.sort());
  }

  // 부모에게서 전달받은 props는 여기에 전부 다 들어있다.
  

  return (
    <div className="App">
      {/* nav */}
      <div className="nav">
        <div>Blog</div>
      </div>

      

      {/* list */}
      <div className="list">
        <button onClick={sorting}>change</button>
      </div>


        
      {/* .map() 함수를 이용한 반복문 사용하기 */}
      {content.map(function (element, i) {
        return (
          // map 반복문으로 순회한 HTML에는 key={}가 필요하다.
          <div className="list" key={i}>
            <h3>

              {/* Category */}
              {element}

              {/* Like Button */}
              <span
                onClick={() => {
                  // state 변경 함수를 실행했을 때 state가 변경된다.
                  setLike(like + 1);
                }}
              >
                {" 💜 "}
              </span>
              
              {/* like EA */}
              {like}
            </h3>

            <p>{showToday}</p>
            <hr />
          </div>
        );
      })}
      {/* 2-1 modal button 구현 */}
      
      <div className="publish">
        <input onChange={ (e) => {setInputValue(e.target.value)}}/>
        <button onClick={ () => {
          let copyContent = [...content];
          copyContent.unshift(inputValue);
          setContent(copyContent)
          
          
          }}>저장</button>
      </div>

      <button
        onClick={() => {
          modalChange(!modal);
        }}
      >
        Modal
      </button>

      {/* 버튼: 배열에서 0,1,2 번째 요소 가져오기 */}
      <button onClick={ () => { titleChange(0)} } >1</button>
      <button onClick={ () => { titleChange(1)} } >2</button>
      <button onClick={ () => { titleChange(2)} } >3</button>
      
      
      {/* 2-2 modal 창 표현되는 위치 */}
      {/* <App 컴포넌트> 안에 있는 state를 <Modal 컴포넌트>로 가져오려고 하면 scope 때문에 제한된다. */}
      {/* 이런 이유로 props를 이용해서 데이터를 전해줘야 한다.*/}
      {modal === true ? <Modal content={content} title={title}></Modal> : null}


    </div>
  );

  function Modal(props) {
    return (
      <div className="modal">
        <h2>{props.content[props.title]}</h2>
        <p>Date</p>
        <p>Description</p>
      </div>
    );
  }

}

export default App;
