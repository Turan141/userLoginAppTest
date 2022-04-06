import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

// Styles

const Section = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  position: relative;
  padding: 25px;
  margin: 10px;
  width: 40vw;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.label`
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 40vw;
  height: 5vh;
  padding: 5px 5px 5px 15px;
  background-color: #f3f3f3;
  border: none;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const RememberMeDiv = styled.div`
  width: 40vw;
`;

const RememberCheckBox = styled.input`
  &:checked {
    border-color: red;
    background-color: red;
  }
  border-radius: 1px solid black;
  margin-top: 5%;
`;

const ConfirmInput = styled.input`
  background-color: blue;
  border: none;
  width: 42vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
  border-radius: 5px;
  color: white;
  margin-top: 5%;
`;

// const ErrorMessage = styled.div`
//   width: 40vw;
//   border: 1px solid red;
//   background-color: rosybrown;
//   border-radius: 5px;
//   padding: 2vh 2% 2vh 2%;
// `;

// Types

type Inputs = {
  example: string;
  exampleRequired: string;
};

// App

export default function App(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const [login, setLogin] = useState(null);
  const [pass, setPass] = useState(null);

  
  const handleLogin = (e) = > {
    setLogin(e.target.value)
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <Label>
          Логин
          <Input defaultValue="test" {...register("example")} />
          {errors.exampleRequired && (
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              Обязательное поле
            </span>
          )}
        </Label>
        {/* include validation with required or other standard HTML validation rules */}
        <Label>
          Пароль
          <Input onInput={handleLogin} {...register("exampleRequired", { required: true })} />
          {errors.exampleRequired && (
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              Обязательное поле
            </span>
          )}
        </Label>
        {/* errors will return when field validation fails  */}
        <RememberMeDiv>
          <RememberCheckBox type="checkbox" />
          <span style={{ marginLeft: "5%" }}>Запомнить пароль</span>
        </RememberMeDiv>
        <ConfirmInput type="submit" />
      </Form>
    </Section>
  );
}
