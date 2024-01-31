import {
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  ListItemButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  FormGroup,
  InputLabel,
  TextField,
  Button,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CreateForm from '../components/createFrom';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FormContext } from '../context/formContext';
import MenuIcon from '@mui/icons-material/Menu';

const FormGenerator = () => {
  const [state, setState] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputtypes, setInputtypes] = useState('');
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(open);
  };
  const tagList = [...tags];
  const handleTagChange = (newValue, actionMeta) => {
    setTags(newValue);
  };

  const list = () => (
    <Box
      sx={{ width: '250px', background: '#fff' }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Typography variant='h6' sx={{ pl: 1, fontWeight: 'bold' }}>
          Form Generator
        </Typography>
      </List>
      <Divider />
      <List>
        {['Generate form'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const DesktopList = () => {
    return (
      <Box sx={{ width: 250, height: '100vh', background: '#fff' }}>
        <List>
          <Typography variant='h6' sx={{ pl: 1, fontWeight: 'bold' }}>
            Form Generator
          </Typography>
        </List>
        <Divider />
        <List>
          {['Generate form'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const { setForms, forms } = useContext(FormContext);

  const handleAddField = (data) => {
    const newField = {
      name: data.name || '',
      inputType: data.inputType || null,
      type: data.type || 'text',
      placeholder: data.placeholder || '',
      disable: data.disable || false,
      options: tags || [],
      label: data.label || '',
      formName: data.formName || '',
    };
    setFormFields([...formFields, newField]);
    setForms([...formFields, newField]);
    reset();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const handleRemoveField = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
    <div className='flex justify-start'>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <DesktopList />
      </Box>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <button
          onClick={toggleDrawer(true)}
          style={{ paddingTop: '1.3rem', paddingLeft: '1rem' }}
        >
          <MenuIcon />
        </button>
        <Drawer anchor='left' open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Box>
      <Box sx={{ width: '100%', px: 5 }}>
        <Box>
          <Typography variant='h5' className='py-5'>
            Add fields
          </Typography>
          <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit(handleAddField)}
          >
            <Grid container xs={12} sx={{ gap: 2 }}>
              <Grid item xs={12} lg={3}>
                <FormGroup>
                  <InputLabel sx={{ fontWeight: '900' }}>Form Name</InputLabel>
                  <Controller
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextField
                        sx={{ background: '#fff' }}
                        size='small'
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Form Name'
                      />
                    )}
                    name={'formName'}
                    control={control}
                    rules={{ required: 'This field is required' }}
                  />
                  {errors['formName'] && (
                    <span style={{ color: 'red' }}>
                      {errors['formName'].message}
                    </span>
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12} lg={3}>
                <InputLabel sx={{ fontWeight: '900' }}>Input Type</InputLabel>
                <Controller
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Select
                      options={[
                        {
                          label: 'input',
                          value: 'input',
                        },
                        {
                          label: 'textarea',
                          value: 'textarea',
                        },
                        {
                          label: 'dropdown',
                          value: 'dropdown',
                        },
                        {
                          label: 'checkbox',
                          value: 'checkbox',
                        },
                        {
                          label: 'radio',
                          value: 'radio',
                        },
                      ]}
                      onChange={(e) => {
                        setValue('inputType', e.value);
                        setInputtypes(e.value);
                      }}
                      onBlur={onBlur}
                      placeholder='Select Input Type'
                    />
                  )}
                  name={'inputType'}
                  control={control}
                  rules={{ required: 'This field is required' }}
                />
                {errors['inputType'] && (
                  <span style={{ color: 'red' }}>
                    {errors['inputType'].message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} lg={3}>
                <InputLabel sx={{ fontWeight: '900' }}>Label</InputLabel>
                <Controller
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextField
                      sx={{ background: '#fff' }}
                      fullWidth
                      size='small'
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder='Label'
                    />
                  )}
                  name={'label'}
                  control={control}
                  rules={{ required: 'This field is required' }}
                />
                {errors['label'] && (
                  <span style={{ color: 'red' }}>
                    {errors['label'].message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} lg={3}>
                <InputLabel sx={{ fontWeight: '900' }}>Name</InputLabel>
                <Controller
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextField
                      sx={{ background: '#fff' }}
                      fullWidth
                      size='small'
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={'Name'}
                    />
                  )}
                  name={'name'}
                  control={control}
                  rules={{ required: 'This field is required' }}
                />
                {errors['name'] && (
                  <span style={{ color: 'red' }}>{errors['name'].message}</span>
                )}
              </Grid>
              {(inputtypes === 'input' ||
                inputtypes === 'textarea' ||
                inputtypes === 'dropdown') && (
                <Grid item xs={12} lg={3}>
                  <InputLabel sx={{ fontWeight: '900' }}>
                    Placeholder
                  </InputLabel>
                  <Controller
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextField
                        sx={{ background: '#fff' }}
                        fullWidth
                        size='small'
                        placeholder='Placeholder'
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                    name={'placeholder'}
                    control={control}
                    rules={{ required: 'This field is required' }}
                  />
                  {errors['placeholder'] && (
                    <span style={{ color: 'red' }}>
                      {errors['placeholder'].message}
                    </span>
                  )}
                </Grid>
              )}
              {inputtypes === 'input' && (
                <Grid item xs={12} lg={3}>
                  <InputLabel sx={{ fontWeight: '900' }}>Type</InputLabel>
                  <Controller
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Select
                        options={[
                          {
                            label: 'password',
                            value: 'password',
                          },
                          {
                            label: 'text',
                            value: 'text',
                          },
                        ]}
                        onChange={(e) => {
                          setValue('type', e.value);
                        }}
                        placeholder={'Select Type'}
                      />
                    )}
                    name={'type'}
                    control={control}
                    rules={{ required: 'This field is required' }}
                  />
                  {errors['type'] && (
                    <span style={{ color: 'red' }}>
                      {errors['type'].message}
                    </span>
                  )}
                </Grid>
              )}
              {inputtypes === 'dropdown' && (
                <Grid item xs={12} lg={3}>
                  <InputLabel sx={{ fontWeight: '900' }}>
                    Dropdown Options (type and press enter)
                  </InputLabel>
                  <Controller
                    render={({ field: { onChange, value, onBlur } }) => (
                      <CreatableSelect
                        onChange={handleTagChange}
                        options={tagList}
                        isMulti
                        placeholder={'Enter Dropdown Options'}
                      />
                    )}
                    name={'options'}
                    control={control}
                    //   rules={{ required: 'This field is required' }}
                  />
                  {errors['options'] && (
                    <span style={{ color: 'red' }}>
                      {errors['options'].message}
                    </span>
                  )}
                </Grid>
              )}

              <Grid item xs={12} lg={3}>
                <InputLabel sx={{ fontWeight: '900' }}>Disable</InputLabel>
                <Controller
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Select
                      options={[
                        {
                          label: 'false',
                          value: 'false',
                        },
                        {
                          label: 'true',
                          value: 'true',
                        },
                      ]}
                      onChange={(e) => {
                        setValue('disable', e.value);
                      }}
                      onBlur={onBlur}
                      placeholder='Disabel'
                    />
                  )}
                  name={'disable'}
                  control={control}
                  rules={{ required: 'This field is required' }}
                />
                {errors['disable'] && (
                  <span style={{ color: 'red' }}>
                    {errors['disable'].message}
                  </span>
                )}
              </Grid>
            </Grid>
            <Button
              color='primary'
              variant='contained'
              sx={{ mt: 4 }}
              type='submit'
              size='small'
            >
              Add Field
            </Button>
          </form>
        </Box>

        {forms?.length > 0 && (
          <CreateForm
            formFields={formFields}
            handleRemoveField={handleRemoveField}
            onSubmit={onSubmit}
          />
        )}
      </Box>
      
    </div>
    <Box sx={{display:{xs:'none',lg:'block'},position:'absolute', bottom:0, right:0, background:"#efefef"}}>Made by Ayush Tripathi | <a href='mailto:ayushtripathi5014@gmail.com'>ayushtripathi5014@gmail.com</a></Box>
    </>
  );
};

export default FormGenerator;
