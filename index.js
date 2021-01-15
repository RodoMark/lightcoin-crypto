class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    this._balance = 0;
    if (this.transactions.length < 2) {
      return this.transactions[0];
    } else {
      for (const transaction of this.transactions) {
        this._balance += transaction;
      }
    }
    return this._balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();
    if (this.isAllowed()) {
      return this.account.addTransaction(this.value);
    } else {
      return console.log("\nInsufficient funds\n");
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return 0 - this.amount;
  }

  isAllowed() {
    return this.account.balance - this.value >= 0 ? true : false;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Deposit(50.25, myAccount);
t1.commit();
console.log("Transaction 1:", t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log("Transaction 2:", t2);

t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log("Transaction 3:", t3);

console.log("Ending balance:", myAccount.balance);
