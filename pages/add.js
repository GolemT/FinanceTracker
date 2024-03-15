import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
 
export default function Add() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
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
      const loadTags = async () => {
          const tagsObj = await window.electron.loadTags();
          const tagsKeys = Object.keys(tagsObj)
          setAvailableTags(tagsKeys);
      };

      loadTags();
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
        // Hier könntest du die Daten an den Hauptprozess von Electron senden oder in den Zustand deiner Anwendung speichern
        const success = await window.electron.saveData({ name, date, tags: selectedTags, amount });
    // Überprüfe, ob die Speicherung erfolgreich war, bevor du navigierst
    if (success) {
        router.push('/list');
    } else {
        // Handle Fehlerfall
        setMessage('Error while saving');
    }
  };

  

  return (
    <Layout>
        Add a new Transaction
        
          <FormControl sx={{ m: 1, width: '100%', '& > :not(style)': { m:1 }, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>

            <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            margin="normal" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Transaction Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} margin='normal' required />}
                  />
            </LocalizationProvider>

            <Select
            labelId="demo-multiple-name-label"
            label="Tag"
            id="demo-multiple-name"
            multiple
            margin="normal"
            value={selectedTags}
            onChange={handleTagChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
            >
            {availableTags.map((tag) => (
              <MenuItem
                key={tag}
                margin="normal"
                value={tag}
                style={getStyles(name, tag, theme)}
              >
                {tag}
              </MenuItem>
              ))}
            </Select>

            <OutlinedInput
              id="outlined-number"
              label="Number"
              margin="normal"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              endAdornment={<InputAdornment position="end">$*</InputAdornment>}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {message}
            <IconButton aria-label="add" size="large" color="primary" onClick={handleSubmit}><AddIcon /></IconButton>
          </FormControl>
    </Layout>
  );
}
