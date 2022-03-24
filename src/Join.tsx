import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px;
  padding: 5px;
  border: none;
`;

const Button = styled.button`
  background-color: skyblue;
  border: none;
  margin: 10px;
  padding: 5px;
  &:hover {
    background-color: royalblue;
    color: white;
  }
`;

const Message = styled.div`
  margin: 0 10px;
  font-size: 11px;
  color: yellow;
  font-style: italic;
`;

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string;
  }

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same." },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Fail to Join. Please try later." });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              // /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: "Only Naver Email address allowed.",
            },
          })}
          placeholder="Email"
        />
        <Message>{errors?.email?.message}</Message>

        <Input
          {...register("firstName", { required: "First name is required." })}
          placeholder="First Name"
        />
        <Message>{errors?.firstName?.message}</Message>
        <Input
          {...register("lastName", {
            required: "Last name is required.",
          })}
          placeholder="Last Name"
        />
        <Message>{errors?.lastName?.message}</Message>
        <Input
          {...register("username", {
            required: "User name is required",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "Choose another name." : true,
              noNick: (value) =>
                value.includes("nick") ? "nick doesn't allowed" : true,
            },
          })}
          placeholder="Username"
        />
        <Message>{errors?.username?.message}</Message>
        <Input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Your Password is too Short.",
            },
          })}
          placeholder="Password"
        />
        <Message>{errors?.password?.message}</Message>
        <Input
          {...register("password1", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Your Password is too Short.",
            },
          })}
          placeholder="Password1"
        />
        <Message>{errors?.password1?.message}</Message>
        <Message>{errors?.extraError?.message}</Message>
        <Button>add</Button>
      </Form>
    </Container>
  );
}

export default Join;
