import {
  Box,
  Button,
  Checkbox,
  Container,
  FormGroup,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import RemoveIcon from '@mui/icons-material/Remove';
import { FormContext } from '../context/formContext';

const CreateForm = ({ formFields, onSubmit, handleRemoveField }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { forms } = useContext(FormContext);
  const renderFormField = (field) => {
    switch (field?.inputType) {
      case 'input':
        return (
          <TextField
            fullWidth
            size='small'
            type={field?.type || 'text'}
            placeholder={field?.placeholder}
            name={field?.name}
            isDisabled={field?.disable || false}
          />
        );
      case 'textarea':
        return (
          <TextField
            multiline
            size='small'
            fullWidth
            rows={2}
            name={field?.name}
            placeholder={field?.placeholder}
            isDisabled={field?.disable || false}
          />
        );
      case 'dropdown':
        return <Select name={field.name} options={field?.options || []} />;
      case 'checkbox':
        return (
          <>
            <Checkbox
              type='checkbox'
              name={field?.name}
              isDisabled={field?.disable || false}
            />
          </>
        );
      case 'radio':
        return (
          <>
            <input
              type='radio'
              name={field?.name}
              isDisabled={field?.disable || false}
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div style={{ marginTop: '3rem' }}>
      <Box
        sx={{
          background: '#fff',
          border: '1px #aeaeae solid',
          borderRadius: '10px',
          p: 2,
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3 }}>
          Generator Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid xs={12} gap={2} container>
            {forms.map((field, index) => (
              <Grid item xs={12} lg={3} key={field?.name}>
                <FormGroup>
                  <InputLabel sx={{ fontWeight: '900' }}>
                    {field?.label}
                  </InputLabel>
                  <Controller
                    render={({ field: { onChange, value } }) =>
                      renderFormField(field)
                    }
                    name={field?.name}
                    control={control}
                    rules={{ required: 'This field is required' }}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <button
                      style={{
                        width: 'fit-content',
                        background: '#b20000',
                        padding: '3px 5px',
                        borderRadius: '5px',
                        marginTop: '5px',
                        color: '#fff',
                      }}
                      onClick={() => handleRemoveField(index)}
                    >
                      <RemoveIcon />
                    </button>
                  </Box>
                  {errors?.field?.name && (
                    <span style={{ color: 'red' }}>
                      {errors?.field?.name.message}
                    </span>
                  )}
                </FormGroup>
              </Grid>
            ))}
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default CreateForm;
