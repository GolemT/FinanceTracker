import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { useTheme as useMuiTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, InputLabel, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styles from 'styles/main.module.css';
import { checkAuth } from '../../app/checkAuth';
import {fetchDataAndUpdateContext, useDataContext} from "../../app/getContext";
import { useTheme } from 'app/ThemeContext';
 
const add = ({ user }) => {
    const { themeMode } = useTheme();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const {setTransactions, tags, setTags } = useDataContext();
    const [selectedTags, setSelectedTags] = useState([]);
    const availableTags = tags.map(tag => tag.name);
    // Formatiere das aktuelle Datum im YYYY-MM-DD Format für das input[type='date']
    // new Date().toISOString().split('T')[0]
    const [date, setDate] = useState(dayjs());
    const [message, setMessage] = useState("");
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

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



    const theme = useMuiTheme();
  
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
            await fetchDataAndUpdateContext(user, setTransactions, setTags);
            await router.push('/access/list');
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
          <div id="content" className={styles.content} style={{background: themeMode.body, color: themeMode.text}}>
          <h3>Add a new Transaction</h3>
          <h4 className={styles.warning}>{message}</h4>
          <FormControl margin="normal" sx={{ m: 1, width: '100%', '& > :not(style)': { m:1 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

            <TextField 
            label="Name" 
            variant="filled" 
            margin="normal" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              minWidth: 300,
              input: {color: themeMode.text}, 
              backgroundColor: themeMode.background, 
              '& .MuiInputBase-input': { color: themeMode.text },
              '& .MuiFilledInput-root': { backgroundColor: themeMode.background },
              '& .MuiInputLabel-root': { color: themeMode.label }, 
              '& .MuiOutlinedInput-notchedOutline': { borderColor: themeMode.toggleBorder }}}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Transaction Date"
                value={date}
                onChange={(newValue) => {
                    if (newValue) {
                    setDate(newValue);
                    }
                }}
                sx={{ 
                  input: {color: themeMode.text}, 
                  backgroundColor: themeMode.background, 
                  '& .MuiInputBase-input': { color: themeMode.text },
                  '& .MuiFilledInput-root': { backgroundColor: themeMode.background },
                  '& .MuiInputLabel-root': { color: themeMode.label }, 
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: themeMode.toggleBorder }}}
                />
            </LocalizationProvider>

            <FormControl sx={{ minWidth: 300, margin: 'normal' }}>
              <InputLabel id="tags-label">Tags (Optional)</InputLabel>
              <Select
                labelId="tags-label"
                id="tags-select"
                multiple
                variant="filled"
                value={selectedTags}
                onChange={handleTagChange}
                input={<OutlinedInput label="Tag" />}
                MenuProps={MenuProps}
                sx={{ 
                  input: {color: themeMode.text}, 
                  backgroundColor: themeMode.background, 
                  '& .MuiInputBase-input': { color: themeMode.text },
                  '& .MuiFilledInput-root': { backgroundColor: themeMode.background },
                  '& .MuiInputLabel-root': { color: themeMode.label }, 
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: themeMode.toggleBorder }}}
              >
              {availableTags.map((tag) => (
                <MenuItem key={tag} value={tag} style={getStyles(tag, selectedTags, theme)}>
                  {tag}
                </MenuItem>
              ))}
              </Select>
            </FormControl>

            <TextField
            label="Amount"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            margin="normal"
            variant="filled"
            sx={{
              minWidth: 300,
              input: {color: themeMode.text}, 
              backgroundColor: themeMode.background, 
              '& .MuiInputBase-input': { color: themeMode.text },
              '& .MuiFilledInput-root': { backgroundColor: themeMode.background },
              '& .MuiInputLabel-root': { color: themeMode.label }, 
              '& .MuiOutlinedInput-notchedOutline': { borderColor: themeMode.toggleBorder }}}
          />
            <IconButton aria-label="add" size="large" color="primary" onClick={handleSubmit}>
                <img src="/Add_button.svg" alt={"add"}/>
            </IconButton>
          </FormControl>
        </div>
    </Layout>
  );
}

export const getServerSideProps = checkAuth();

export default add;
