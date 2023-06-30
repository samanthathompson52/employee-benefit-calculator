import React, {useState} from 'react';
import {createEmployeeObject} from '../util';
import DeleteIcon from '../images/delete-icon.png';

const InputEmployee = (props) => {

    const {addEmployee} = props;

    const [name, setName] = useState("");
    const [dependents, setDependents] = useState([""]);

    const submitEmployeeRecord = () =>
    {       
        const employee = createEmployeeObject(name, dependents)
        addEmployee(employee); 

        const emptyArray = Array(dependents.length).fill("");
        setDependents(emptyArray);
        setName("");
    }

    const handleInputChange = (e, index) => {
        const newDependents = [...dependents];
        newDependents[index] = e.target.value;
        setDependents(newDependents);
    };

    const addInput = () => {
        setDependents([...dependents, '']);
      };

    const deleteDependent = (index) => {
        const copy = [...dependents];
        copy.splice(index, 1);
        setDependents(copy);
    }

    return(           
        <div>
            <div>
                <h2>Add an Employee and their Dependents</h2>
            </div>
            <div className='padding-bottom-sm'>
                <div>
                    <label htmlFor="employee">Employee:</label>
                </div>
                <div>
                    <input id="employee" className="text-input" type="text" name="employee" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div>
                <label className="pt-2">Dependents:</label>
            </div>
            <div className='row'>
                {dependents.map((dependent, index) => (
                    <div key={index} className='col-12 col-sm-6 col-lg-4'>
                        <div className='d-flex align-items-center pb-2'>
                            <input
                            value={dependent}
                            className="text-input"
                            onChange={(e) => handleInputChange(e, index)}
                            />
                            <img src={DeleteIcon} onClick={() => deleteDependent(index)} alt="delete-icon" className="delete-icon"/>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-3 d-flex justify-content-between">
                <button className="add-button" onClick={(e) => submitEmployeeRecord()}> Submit Employee</button>
                
                {/* Assuming a maximum of 9 dependents per employee */}
                {dependents.length < 9 ? <button className="add-button" onClick={addInput}>Add Dependent</button> : null  }             
            </div>
        </div>
    );
  }

  export default InputEmployee;

