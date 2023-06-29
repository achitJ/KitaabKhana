import { IFormArgs } from "../../types/hooks/useForm";
import { ILoginForm } from '../../types/misc';

export const formMetadata: IFormArgs<ILoginForm> = {
    initialValues: {
        email: '',
        name: null,
        password: '',
    },

    validate: {
        name: () => null, //no checks for name
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
};