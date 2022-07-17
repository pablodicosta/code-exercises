/*
Calculate the balance in each requested category within the specified time period.
You can assume that the transactions parameter will always be present and valid.

Input: 
- list of transactions (Transaction[]): All transactions are guaranteed to have the same currency.
- list of categories (String[])
- start time (inclusive) (Date)
- end time (exclusive) (Date)

Output:
- Object of category as key and balance as value (Object: { category: balance })
*/

const isInDateRange = (time, start, end) => time >= start && time < end; 

const getBalanceByCategoryInPeriod = (
  transactions = [],
  categories = [],
  start,
  end
) => transactions.reduce((balances, { time, category, amount }) => { 
    if (isInDateRange(new Date(time), start, end) && categories.includes(category)) {
        balances[category] += amount;
    }
    return balances;
}, categories.reduce((categories, category) => ({ ...categories, [category]: 0 }), {}));


const transactions = [
    {
      id: '11ff73b5-e771-441c-886a-498d93b5093d',
      sourceAccount: 'my_account',
      targetAccount: 'restaurant',
      amount: -9600,
      currency: 'EUR',
      category: 'eating_out',
      time: '2021-04-08T05:15:56.905Z',
    },
    {
      id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
      sourceAccount: 'my_account',
      targetAccount: 'cinema',
      amount: -5700,
      currency: 'EUR',
      category: 'entertainment',
      time: '2021-04-07T21:16:57.819Z',
    },
    {
      id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
      sourceAccount: 'my_account',
      targetAccount: 'book_store',
      amount: -7400,
      currency: 'EUR',
      category: 'entertainment',
      time: '2021-04-07T22:46:44.071Z',
    },
    {
      id: '837127ab-f523-4b11-bed3-ae488be4545d',
      sourceAccount: 'my_account',
      targetAccount: 'fitness_club',
      amount: -9200,
      currency: 'EUR',
      category: 'sports',
      time: '2021-04-05T01:55:16.646Z',
    },
  ];

const balances = getBalanceByCategoryInPeriod(
    transactions,
    ['sports', 'sarasa'],
    new Date('2021-04-01'),
    new Date('2021-04-30')
  );

  console.log(balances);