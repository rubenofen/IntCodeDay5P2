import React, { useState, useEffect } from 'react';
import defaultInput from './input';
import Table from './components/Table';
import { part1 } from './StatusMachine/IntCode';

const iniTable = data =>
  data.map(value => {
    return { value: parseInt(value), status: '' };
  });

const resetTable = data => {
  const newArray = new Array(data.length).fill({ value: '', status: '' });
  return newArray.map((value, index) =>
    data[index] ? { value: data[index].value, status: '' } : value
  );
};

function App() {
  const [rawInput, setRawInput] = useState(defaultInput);
  const [table, setTable] = useState(iniTable(rawInput.split(',')));
  const [currentPointer, setCurrentPointer] = useState(0);
  const [output, setOutput] = useState([]);
  const [op, setOp] = useState('');
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [tiemoutId, setTiemoutId] = useState('');

  const executeStep = () => {
    const newStatus = part1(resetTable(table), currentPointer);
    const newOputput = output.concat([newStatus.output]);
    setTable(newStatus.table);
    setCurrentPointer(newStatus.current_pointer);
    setOutput(newOputput);
    setOp(newStatus.op);
  };

  useEffect(() => {
    if (auto && op !== '99') {
      setTiemoutId(setTimeout(executeStep, speed));
    }
  }, [currentPointer, auto]);

  const load = input => {
    setTable(iniTable(input.target.value.split(',')));
    setRawInput(input.target.value);
  };

  const checkAuto = input => {
    setAuto(input.target.checked);
    if (!input.target.checked) {
      clearTimeout(tiemoutId);
      setTiemoutId('');
    }
  };

  const onChangeSpeed = valueSpeed => {
    setSpeed(valueSpeed.target.value);
  };

  return (
    <div className="App">
      <Table input={table} rowElements={30} />
      <button onClick={executeStep} disabled={op === '99'}>
        Next step
      </button>
      OP: <span>{op}</span>
      <br />
      Auto: <input type="checkbox" onChange={checkAuto} checked={auto} />
      Speed: <input type="number" value={speed} onChange={onChangeSpeed} />
      <br />
      {output && output.map(value => <div>{value}</div>)}
      INPUT:
      <div>
        <textarea rows="10" cols="50" onChange={load} value={rawInput} />
      </div>
    </div>
  );
}

export default App;
