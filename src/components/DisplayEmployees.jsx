import React from 'react';
import DeleteIcon from '../images/delete-icon.png';

const DisplayEmployees = (props) => {

    const {employees} = props;
    const {deleteEmployee} = props;
    let totalBenefitCost = 0;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const namesHTML = employees.map((employee, index) => {
        totalBenefitCost += employee.yearlyBenefitCost;
        return (
            <div key={employee.id} className="display-border pb-2">
                <div className="d-flex justify-content-between">
                    <div>
                        {employee.name}
                        <img src={DeleteIcon} onClick={() => deleteEmployee(index)} alt="delete-icon" className="delete-icon"/>
                    </div>
                    <div>
                        {formatter.format(employee.cost)}
                    </div>
                </div>

                {employee.dependents.map((dependent) => {
                    return (
                        <div className="d-flex justify-content-between ps-3" key={dependent.id}>
                            <div>
                                {dependent.name} 
                            </div>
                            <div>
                                {formatter.format(dependent.cost)}
                            </div>
                        </div>
                    )
                })}

                <div className="text-end pt-1">
                    <span className="display-subtotals-border">Employee Yearly Benefit Cost: {formatter.format(employee.yearlyBenefitCost)} </span>
                </div>
                <div className="text-end">
                    <span>Amount to Deduct per Paycheck: {formatter.format(employee.amountToDeductPerPaycheck)} </span>
                </div>
                <div className="text-end">
                    <span>Remaining Paycheck Amount: {formatter.format(employee.remainingPaycheckAmount)} </span>
                </div>
            </div>
        )
    })

    return(           
        <>
            <div className="pt-3 ">
                <h2>Employees & Dependents</h2>
            </div>
            <div className='pe-3 flex-grow-1 calculator-display'>
                {namesHTML}
            </div>
            <div>
                <h3 className='align-baseline text-end pe-3 pt-3'>Total Yearly Benefit Cost: {formatter.format(totalBenefitCost)}</h3>
            </div>
        </>

    );
  }

  export default DisplayEmployees;

