'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .min(0, 'Age must be at least 0')
    .nullable()
    .transform((v, o) => (o === '' ? null : v))
    .optional(),
});

type FormData = yup.InferType<typeof schema>;

type FormData1 = {
  name: string;
  email: string;
  age?: number | null | undefined;
};

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: '0 auto' }}
      className="space-y-2"
    >
      <div>
        <label>Name:</label>
        <input
          {...register('name')}
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <input
          {...register('email')}
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          {...register('age')}
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
