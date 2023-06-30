import React, {useState} from 'react';
import InputEmployee from './InputEmployee';
import DisplayEmployees from './DisplayEmployees';

const Calculator = () => {

    const [employees, setEmployees] = useState([]);

    const addEmployee = (newEmployee) => {
        if (!newEmployee.name) {
            return;
        }

        const newEmployees = [...employees, newEmployee];
        setEmployees(newEmployees);
    }

    const deleteEmployee = (index) => {
        const newEmployees = [...employees];
        newEmployees.splice(index, 1);
        setEmployees(newEmployees);
    }

    const clearEmployees  = () =>  {
        setEmployees([]);
    }

    return(   
        <div className="p-2">
            <div className="container calculator-container d-flex flex-column">
                <InputEmployee addEmployee={addEmployee} />
                <DisplayEmployees employees={employees} deleteEmployee={deleteEmployee}/>
                <div>
                    <button className="clear-button" onClick={(e) => clearEmployees()}> Clear List </button>
                </div>
            </div>
        </div>        
    );
  }

  export default Calculator;

