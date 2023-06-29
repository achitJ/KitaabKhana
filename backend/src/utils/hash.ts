import bcrypt from 'bcryptjs';

export const hash = (password: string): string => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
}