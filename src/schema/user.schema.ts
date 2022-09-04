import { string, object, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is to short - should be min 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is to short - should be min 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

// create an zod interface
export type CreateUserInterface = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInterface = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInterface = TypeOf<
  typeof forgotPasswordSchema
>['body'];
export type ResetPasswordInterface = TypeOf<typeof resetPasswordSchema>;
