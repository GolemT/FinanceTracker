import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, InputLabel, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../../app/checkAuth';
import { CircularProgress } from '@mui/material';
 
const add = ({ user }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // Formatiere das aktuelle Datum im YYYY-MM-DD Format für das input[type='date']
    // new Date().toISOString().split('T')[0]
    const [date, setDate] = useState(dayjs());
    const [message, setMessage] = useState(undefined);
    const router = useRouter();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        margin: 20,
      },
    },
  };
    

    useEffect(() => {
      const fetchTags = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/v1/tags/${user.nickname}`);
            const data = await response.json();
            if (response.ok) {
                setAvailableTags(data.map(tag => tag.name));
            } else {
                throw new Error('Failed to fetch tags');
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
            setMessage('Failed to load tags');
        } finally {
          setIsLoading(false);
        }
    };

    fetchTags();
}, []);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



    const theme = useTheme();
  
    const handleTagChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedTags(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( name === '' || amount === '') {
          setMessage("Required Fields were not filled");
          return;
        }

        const formattedDate = date.format('YYYY-MM-DD');
        const formattedAmount = parseFloat(amount).toFixed(2);
        
        try {
          const response = await fetch('/api/v1/transactions/add', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  user: user.nickname,
                  name,
                  date: formattedDate,
                  tags: selectedTags,
                  amount: formattedAmount
              }),
          });
        
          const result = await response.json();
          if (response.ok) {
            router.push('/access/list');
        } else {
            throw new Error(result.message || 'Failed to add transaction');
        }
    } catch (error) {
        console.error('Error adding transaction:', error);
        setMessage(error.message || 'Failed to add transaction');
    }
  };

  return (
    <Layout>
      
      { isLoading ? (
        <CircularProgress />
      ): (
          <content className={styles.content}>
          <h3>Add a new Transaction</h3>
          <h4 className={styles.warning}>{message}</h4>
          <FormControl margin="normal" sx={{ m: 1, width: '100%', '& > :not(style)': { m:1 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

            <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            margin="normal" 
            required
            sx={{ minWidth: 300 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Transaction Date"
                  value={date}
                  sx={{ minWidth: 300 }}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} margin='normal' required />}
                  />
            </LocalizationProvider>

            <FormControl sx={{ minWidth: 300, margin: 'normal' }}>
              <InputLabel id="tags-label">Tags (Optional)</InputLabel>
              <Select
                labelId="tags-label"
                id="tags-select"
                multiple
                value={selectedTags}
                onChange={handleTagChange}
                input={<OutlinedInput label="Tag" />}
                MenuProps={MenuProps}
              >
              {availableTags.map((tag) => (
                <MenuItem key={tag} value={tag} style={getStyles(tag, selectedTags, theme)}>
                  {tag}
                </MenuItem>
              ))}
              </Select>
            </FormControl>

            <TextField
            id="outlined-number"
            label="Amount"
            type="number"
            required
            value={amount}
            sx={{ minWidth: 300 }}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            margin="normal"
            variant="outlined"
          />
            <IconButton aria-label="add" size="large" color="primary" onClick={handleSubmit}><img src="/Add_button.svg"/></IconButton>
          </FormControl>
        </content>
      )}
    </Layout>
  );
}

export const getServerSideProps = checkAuth();

export default add;
