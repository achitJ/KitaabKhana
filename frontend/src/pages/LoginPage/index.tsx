import { useToggle, upperFirst } from '@mantine/hooks';
import useForm from '../../hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Center
} from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { ILoginForm } from '../../types/misc';
import { IUseFormReturnType } from "../../types/hooks/useForm";
import { formMetadata } from './utils';
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [type, toggle] = useToggle(['login', 'register']);
  const form: IUseFormReturnType = useForm<ILoginForm>(formMetadata);
  const navigate = useNavigate();

  return (
    <Center w="100%" h="98vh">
      <Paper radius="md" p="xl" withBorder maw={420}>
        <Text size="lg" weight={500} ta="center">
          Welcome to KitaabKhana
        </Text>

        <Group grow mb="md" mt="md">
          <Button leftIcon={<IconBrandGoogle />} variant="default" color="gray" onClick={() => navigate('/home')}>
            Continue with Google  
          </Button>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                {...form.getInputProps('name')}
                radius="md"
                required
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@email.com"
              {...form.getInputProps('email')}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" onClick={() => {navigate('/home')}}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}