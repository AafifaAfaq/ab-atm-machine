#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let balance = 25000; // pkr
let pinNumber = 6666;
let continueOperation = true;

while (continueOperation) {
  console.log("Welcome to ATM");
  // Pin Number
  let pinAnswer;
  let correctPin = false;
  while (!correctPin) {
    pinAnswer = await inquirer.prompt([
      {
        type: "number",
        name: "pin",
        message: "Enter your pin number",
      },
    ]);
    if (pinAnswer.pin === pinNumber) {
      console.log(chalk.green("Correct Pin Number"));
      correctPin = true;
    } else {
      console.log(chalk.red("Incorrect Pin Number.Try Again!"));
    }
  }

  //Operation to be Performed
  let operationAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "operation",
      message: "Enter your operation",
      choices: ["Deposit", "Withdraw", "Fast Cash", "Check Balance", "Exit"],
    },
  ]);
  console.log(operationAnswer);

  //Deposit
  if (operationAnswer.operation === "Deposit") {
    let depositedAmount = await inquirer.prompt([
      {
        type: "number",
        name: "amount",
        message: "Enter the amount to be deposited",
      },
    ]);
    balance = balance + depositedAmount.amount;
    console.log(
      chalk.green("Deposited " + depositedAmount.amount + " pkr succesfully")
    );
    // Display current balance after deposit
    console.log(chalk.yellow("Current Balance is " + balance + " pkr"));
  }

  //Withdraw
  if (operationAnswer.operation === "Withdraw") {
    let withdrawnAmountResponse = await inquirer.prompt([
      {
        type: "number",
        name: "amount",
        message: "Enter the amount to be withdrawn",
      },
    ]);

    let withdrawnAmount = withdrawnAmountResponse.amount;

    if (withdrawnAmount > balance) {
      console.log(chalk.red("Insufficient Balance"));
    } else {
      balance = balance - withdrawnAmount;
      console.log(
        chalk.green("Withdrawn " + withdrawnAmount + " pkr successfully")
      );
      // Display current balance after withdrawn
      console.log(chalk.yellow("Current Balance is " + balance + " pkr"));
    }
  }

  //Fast Cash
  if (operationAnswer.operation === "Fast Cash") {
    let cashAmount = await inquirer.prompt([
      {
        type: "list",
        name: "amount",
        message: "Select the amount to be fast cash",
        choices: ["1000", "3000", "5000", "10000", "15000"],
      },
    ]);
    balance = balance - cashAmount.amount;
    console.log(
      chalk.green(
        "Fast Cash of" + cashAmount.amount + " pkr withdrawn successfully"
      )
    );
    // Display current balance after fast
    console.log(chalk.yellow("Current Balance is " + balance + " pkr"));
  }
  //Check Balance
  if (operationAnswer.operation === "Check Balance") {
    console.log(chalk.yellow("Your current balance is " + balance + " pkr"));
  }

  //Exit
  if (operationAnswer.operation === "Exit") {
    console.log(chalk.green("Exiting..."));
    continueOperation = false;
  }
  //prompt to continue operation or exit
  let continueAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Do you want to continue?",
      default: "true",
    },
  ]);

  continueOperation = continueAnswer.continue;
}

console.log(chalk.magenta("Thank you for using the ATM!"));
