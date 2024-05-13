import Tag from 'components/interfaces/tags';
import Transaction from 'components/interfaces/transactions';
import { createContext } from 'react';

export let Transactions = createContext<Transaction[]>([]);
export let Tags = createContext<Tag[]>([]);

async function getContext(user) {
    try {
        const transactionsResponse = await fetch(`/api/v1/transactions/${user.nickname}`);
        const tagsResponse = await fetch(`/api/v1/tags/${user.nickname}`);
        if (transactionsResponse.ok && tagsResponse.ok) {
          Transactions = createContext(await transactionsResponse.json());
          Tags = createContext(await tagsResponse.json());
    }} catch (error) {
      console.error('Error loading data:', error);
      }
}

export default getContext;