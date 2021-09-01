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
  const formik = useFormik({
    onSubmit: () => { },
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
          <Input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.email && <FormHelperText textColor={e74c3c}>{formik.errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id="password" p={5} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.password && <FormHelperText textColor={e74c3c}>{formik.errors.senha}</FormHelperText>}
        </FormControl>

        <Box display="flex" flexDirection="row">
          <Text>clocker.work/</Text>
          <FormControl id="username" p={4} isRequired>
            <Input type="username" placeholder="Usuário" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.touched.username && <FormHelperText textColor={e74c3c}>{formik.errors.username}</FormHelperText>}

          </FormControl>
        </Box>

        <Box p={4}>
          <Button width="100%" background="#4E84D5" color="white">Entrar</Button>
        </Box>
      </Box>
    </Container>
  )
};

export default Home;
