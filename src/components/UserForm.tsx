'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  age: z
    .union([z.string().min(1).transform(Number), z.number()])
    .refine(
      (val) =>
        val === undefined ||
        val === null ||
        (!isNaN(Number(val)) && Number(val) >= 0),
      {
        message: 'Age must be at least 0',
      }
    )
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
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
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register('name')}
          className="border border-gray-300 rounded-md p-2 w-full"
          aria-label="Name"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message as string}</span>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          {...register('email')}
          className="border border-gray-300 rounded-md p-2 w-full"
          aria-label="Email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message as string}</span>
        )}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          {...register('age')}
          className="border border-gray-300 rounded-md p-2 w-full"
          aria-label="Age"
        />
        {errors.age && (
          <span className="text-red-500">{errors.age.message as string}</span>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
