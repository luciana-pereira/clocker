import { 
  Container, 
  Box, 
  Input, 
  Button, 
  Text,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import Logo  from '../components/Logo/logo.svg';
import Image from 'next/image';
import firebase from '../config/firebase';
import Link from 'next/link';

let schema = yup.object().shape({
  name: yup.string().required,
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function() {
    return new Date();
  }),
});

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório'),
});

const Home = () => {
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async (values, form) => {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        // console.log(user)
      } catch (error) {
        // console.log('ERROR:', error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  });

  return (
    <Container p={5} centerContent>
      <Image src={Logo} />
      <Box p={5} mt={8}>
        <Text>Crie sua agenda compartilhada.</Text>
      </Box>

      <Box>
        <FormControl id="email" p={5} isRequired>
          <FormLabel>Email</FormLabel>
          <Input size="lg" 
            type="email" 
            value={values.email} 
            onChange={handleChange} 
            onBlur={handleBlur}
          />
          {touched.email && 
            <FormHelperText textColor="#e74c3c">
              {errors.email}
            </FormHelperText>
          }
        </FormControl>

        <FormControl id="password" p={5} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input size="lg" 
            type="password" 
            value={values.password} 
            onChange={handleChange} 
            onBlur={handleBlur}
          />
          {touched.password && 
            <FormHelperText textColor="#e74c3c">
              {errors.password}
            </FormHelperText>
          }
        </FormControl>

        <Box display="flex" flexDirection="row">
          <Text>clocker.work/</Text>
          <FormControl id="username" p={4} isRequired>
            <Input size="lg" 
              type="username" 
              placeholder="Usuário" 
              value={values.username} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
            {touched.username && 
              <FormHelperText textColor="#e74c3c">
                {errors.username}
              </FormHelperText>}
          </FormControl>
        </Box>

        <Box p={4}>
          <Button 
            width="100%" 
            background="#4E84D5" 
            color="white"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Box>
      </Box>

      <Link href="/signup">Ainda não tem uma conta? Cadastre-se</Link>
    </Container>
  )
};

export default Home;
