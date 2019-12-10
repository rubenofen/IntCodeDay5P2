import React from "react";
import "./Table.scss";

const Cell = ({ value, className }) => (
  <td className={`${className} ${value.status}`}>{value.value}</td>
);

const Row = ({ input, index }) => {
  return (
    <tr>
      <th>{index}</th>
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
        i?ths.push(<th>{i-1}</th>):ths.push(<th></th>)
    }
    return ths;
}

const Table = ({ input, rowElements }) => {
    console.log(input);
  return (
    <table>
        <thead>
            <ThThead rowElements={rowElements}/>
        </thead>
      <tbody>
        {input.map((current, index) => {
            console.log(`current ${current}, index ${index}`)
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
