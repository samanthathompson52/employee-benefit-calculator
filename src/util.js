import { v4 as uuidv4 } from 'uuid';

const discountAPercentage = .1;
const basePaycheck = 2000;
const paychecksPerYear = 26;
const employeeBenefitCostPerYear = 1000;
const dependentBenefitCostPerYear = 500;

export function createEmployeeObject(name, dependentNames) {
    const employeeDependents = createDependents(dependentNames);
    const employeeCost = calculateEmployeeBenefitCost(name);
    const employeeYearlyBenefitCost = calculateYearlyBenefitCost(employeeCost, employeeDependents);
    const benefitCostPerPaycheck = calculateBenefitCostPerPaycheck(employeeYearlyBenefitCost);
    const remainingPaycheck = calculateRemainingPaycheck(employeeYearlyBenefitCost);

    const Employee = {
        id: "emp-" + uuidv4(),
        name: name,
        dependents: employeeDependents,
        cost: employeeCost,
        yearlyBenefitCost: employeeYearlyBenefitCost,
        amountToDeductPerPaycheck: benefitCostPerPaycheck,
        remainingPaycheckAmount: remainingPaycheck
    }
    return Employee;
}

export function createDependents(dependentNames) {
    return dependentNames.filter((name) => name !== "").map((name) => {
        const Dependent = { 
            id: "dep-" + uuidv4(),
            name: name,
            cost: calculateDependentBenefitCost(name) 
        };

        return Dependent;
    })
}

export function calculateEmployeeBenefitCost(name) {
    if (meetsDiscountCriteria(name)) {
        return (1 - discountAPercentage) * employeeBenefitCostPerYear;
    }

    return employeeBenefitCostPerYear;
}

export function calculateDependentBenefitCost(name) {
    if (meetsDiscountCriteria(name)) {
        return (1 - discountAPercentage) * dependentBenefitCostPerYear;
    }

    return dependentBenefitCostPerYear;
}

export function meetsDiscountCriteria(name) {
    //Check if names that start with a lowercase 'a' also recieve a discount.
    return name.startsWith("A");
}

export function calculateYearlyBenefitCost(employeeCost, dependents) {
    let yearlyCost = employeeCost;
    dependents.forEach((dependent) => yearlyCost += dependent.cost);
    return yearlyCost;
}

export function calculateBenefitCostPerPaycheck(employeeYearlyBenefitCost) {
    return (employeeYearlyBenefitCost / paychecksPerYear);
}

export function calculateRemainingPaycheck(employeeYearlyBenefitCost) {
    return basePaycheck - (employeeYearlyBenefitCost / paychecksPerYear);
}