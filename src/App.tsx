import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import './assets/global.css';
import { Form, TextField } from './components';
import { Button } from './components';
import assets from './assets/assets';
import { useState } from 'react';

function App() {
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get('username')?.toString().trim();
    const password = data.get('password')?.toString().trim();
    setIdentifierError('');
    setPasswordError('');
    let error = false;
    if (!username) {
      error = true;
      setIdentifierError('Please fill this field');
    }
    if (!password) {
      error = true;
      setPasswordError('Please fill this field');
    }

    if (error) return;
  };

  return (
    <>
      <div className='login-form flex aic jcc h-full w-full'>
        <Form
          className='aic jcc'
          image={assets.images.logo}
          onSubmit={handleSubmit}
          title='Login'>
          <div className='form-group w-full flex fdc'>
            <TextField
              id='password'
              name='username'
              error={identifierError}
              placeholder='Username or email'
              label='Username or email'
            />
            <TextField
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              error={passwordError}
              label='Password'
              link={{ to: '', value: 'forget password?' }}
            />
            <Button
              type='submit'
              fullWidth
              color='primary'
              size='middle'>
              Submit
            </Button>
          </div>
          <span className='form-group w-full aic form-link jcc txt-sm'>
            new in {document.title.split(' ')[0]}?{' '}
            <a href='#'>create an account</a>.
          </span>
        </Form>
      </div>
    </>
  );
}

export default App;
