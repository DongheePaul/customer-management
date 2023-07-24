import React, { Component } from "react";
import Customer from "./components/Customer";
import "./App.css";

const customers = [
  {
    id: 1,
    image: "https://picsum.photos/id/64/200",
    name: "김유나",
    birthday: "961222",
    gender: "여자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://picsum.photos/id/65/200",
    name: "김윤아",
    birthday: "960305",
    gender: "여자",
    job: "프로그래머",
  },
  {
    id: 3,
    image: "https://picsum.photos/id/91/200",
    name: "이순신",
    birthday: "921205",
    gender: "남자",
    job: "디자이너",
  },
];

class App extends Component {
  render() {
    return (
      <div>
        {customers.map((c) => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            ></Customer>
          );
        })}
      </div>
    );
  }
}

export default App;
