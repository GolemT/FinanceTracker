import Tag from 'components/interfaces/tags';
import Transaction from 'components/interfaces/transactions';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextProps {
    transactions: Transaction[];
    setTransactions: (transactions: Transaction[]) => void;
    tags: Tag[];
    setTags: (tags: Tag[]) => void;
}

export const fetchDataAndUpdateContext = async (user, setTransactions, setTags) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log(baseUrl)
    try {
        const transactionsResponse = await fetch(`${baseUrl}api/v1/transactions/${user.nickname}`);
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
        localStorage.setItem('transactions', JSON.stringify(transactionsData)); // Update local storage

        const tagsResponse = await fetch(`${baseUrl}api/v1/tags/${user.nickname}`);
        const tagsData = await tagsResponse.json();
        setTags(tagsData);
        localStorage.setItem('tags', JSON.stringify(tagsData)); // Update local storage
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const DataContext = createContext<UserContextProps | undefined>(undefined);

export const DataContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    // Load transactions and tags from localStorage on initial render
    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        const storedTags = localStorage.getItem('tags');

        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }

        if (storedTags) {
            setTags(JSON.parse(storedTags));
        }
    }, []);

    // Save transactions and tags to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('tags', JSON.stringify(tags));
    }, [tags]);

    return (
        <DataContext.Provider value={{ transactions, setTransactions, tags, setTags }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context: UserContextProps | undefined = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};