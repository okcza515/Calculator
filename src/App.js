import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { evaluate } from 'mathjs';


function App() {
  const buttons = [[1,2,3,'+'],[4,5,6,'-'],[7,8,9,'*'],['=',0,'CL','%']];
  const [Mode, setMode] = useState('Number');
  let number= 0;
  const [equation,setEquation]= useState('0');

 
   
  const checkPin = (pin) => {
    const calculate = () => {
      try {
        return evaluate(equation).toString();
      } catch (error) {
        return 'Error';
      }
    };
    
      if(pin === '='){
      setEquation(calculate());
    }
    else if (['+', '-', '*', '%'].includes(pin)) {
      //if the last character we input is number, we can use NEW operator
      if(Mode === 'Number'){
        setEquation(equation + pin)
        setMode('Operator')
      }
      //if the last character we input is operator, we can only CHANGE operator
      else{
        setEquation(equation.slice(0, -1) + pin)
      }
    }

    else if (pin>=0 && pin<=9) {
        setMode('Number')
        number = number * 10 + pin;
        if(equation === '0'){ 
          if(pin === 0){
            setEquation('0')
          }else{
            setEquation(number)
          }
        }
        else{
          setEquation(equation + String(number))
        }
    }
    else if(pin === 'CL'){
      setEquation('0')
    }


  }

  return (
    <div class="theCalculator">
      <h1 style={{ fontSize: '30px' }}>Calculator App</h1>
      <div className='displayBox'>{equation}</div>
      {buttons.map((buttonRow, rowIndex) => (
        <div key={rowIndex}>
          {buttonRow.map((pin) => (
            <span class="buttonBox" key={pin} onClick={() => checkPin(pin)}>{pin}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
