/*
Given a list of transactions, some transactions are categorized, some transactions are not categorized.
Find similar transactions and categorize them if possible.
Similar transactions have the same targetAccount and the amount difference is not greater than 1000 (for all currencies)
from the originally categorized transaction. If an uncategorized transaction is similar to more than one transaction,
it should take the category from the one with the smallest amount difference.
Transactions that cannot be categorized should still be included in the returned list.
The returned list should preserve the order of the original list.

Input:
- List of transactions (Transaction[]).

Output:
- List of transactions (Transaction[]) with enhanced categorization if possible.
*/

const getDifference = (a, b) => Math.abs(a - b);

const areSimilarTransactions = (txA, txB) =>
  txA.targetAccount === txB.targetAccount &&
  getDifference(txA.amount, txB.amount) <= 1000;

const getTransactionCategory = (transaction, categorizedTransactions) =>
  categorizedTransactions
    .filter(categorizedTx => areSimilarTransactions(transaction, categorizedTx))
    .reduce((prevTx, currentTx) =>
      (getDifference(transaction.amount, prevTx.amount) < getDifference(transaction.amount, currentTx.amount)) ?
        prevTx :
        currentTx
      , {}).category;

const categorizeSimilarTransactions = (transactions) => {
  const categorizedTransactions = transactions
    .filter(tx => tx.category);

  return transactions.map(tx => {
    if (!tx.category) {
      const category = getTransactionCategory(tx, categorizedTransactions);
      if (category) {
        tx.category = category;
      }
    }
    return tx;
  });
}

// 1 category, 1 matching, 1 not matching 
const transactions = [
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -620,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -350,
    category: 'eating_out',
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -1690,
    time: '2021-04-12T08:20:00Z',
  }
];

// 3 different categories, 3 matching, 3 not matching 
const transactions2 = [
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -620,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -350,
    category: 'eating_out',
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -1690,
    time: '2021-04-12T08:20:00Z',
  },
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd6',
    sourceAccount: 'my_account',
    targetAccount: 'cinema',
    amount: -560,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf74',
    sourceAccount: 'my_account',
    targetAccount: 'cinema',
    amount: -100,
    category: 'entertainment',
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b9',
    sourceAccount: 'my_account',
    targetAccount: 'cinema',
    amount: -20,
    time: '2021-04-12T08:20:00Z',
  },
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd7',
    sourceAccount: 'my_account',
    targetAccount: 'football_club',
    amount: -6620,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf75',
    sourceAccount: 'my_account',
    targetAccount: 'football_club',
    amount: -300,
    category: 'sports',
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4c0',
    sourceAccount: 'my_account',
    targetAccount: 'football_club',
    amount: -1690,
    time: '2021-04-12T08:20:00Z',
  }
];

// 3 similar categories, 4 matching, 2 not matching 
const transactions3 = [
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -620,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -350,
    category: 'eating_out',
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -1690,
    time: '2021-04-12T08:20:00Z',
  },
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd6',
    sourceAccount: 'my_account',
    targetAccount: 'cinema',
    amount: -560,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf74',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -1000,
    category: 'food',
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b9',
    sourceAccount: 'my_account',
    targetAccount: 'cinema',
    amount: -20,
    time: '2021-04-12T08:20:00Z',
  },
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd7',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -10,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf75',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -90,
    category: 'brunches',
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4c0',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -950,
    time: '2021-04-12T08:20:00Z',
  }
];

// 3 uncategorized transactions
const transactions4 = [
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -620,
    time: '2021-04-10T10:30:00Z',
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -350,
    time: '2021-03-12T12:34:00Z',
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    amount: -1690,
    time: '2021-04-12T08:20:00Z',
  }
];

// 3 categorized transactions
const transactions5 = [
  {
    id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    category: 'food',
    amount: -620,
    time: '2021-04-10T10:30:00Z'
  },
  {
    id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    category: 'food',
    amount: -350,
    time: '2021-03-12T12:34:00Z'
  },
  {
    id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
    sourceAccount: 'my_account',
    targetAccount: 'coffee_shop',
    category: 'food',
    amount: -1690,
    time: '2021-04-12T08:20:00Z'
  }
];

console.log(categorizeSimilarTransactions(transactions5));