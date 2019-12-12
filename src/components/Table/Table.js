import React from "react";
import "./Table.scss";

const Cell = ({ value, className }) => (
  <td className={`${className} ${value.status}`}>{value.value}</td>
);

const Row = ({ input, index }) => {
  return (
    <tr>
      <td className="left-th">{index}</td>
      {input.map((value, index) => (
        <Cell
          className={index % 10 === 9 ? "bordered" : ""}
          key={index}
          value={value}
        />
      ))}
    </tr>
  );
};

const ThThead = ({rowElements}) => {
    const ths = [];
    for (let i = 0; i <= rowElements; i++) {
        i?ths.push(<td className="left-th" key={i}>{i-1}</td>):ths.push(<td className="left-th" key={i}></td>)
    }
    return ths;
}

const Table = ({ input, rowElements }) => {
  return (
    <table>
      <tbody>
        <tr>
            <ThThead rowElements={rowElements}/>
        </tr>
        {input.map((current, index) => {
          if (index % rowElements === 0) {
            return (
              <Row
                key={index}
                input={input.slice(index, index + rowElements)}
                index={index}
              />
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default Table;
