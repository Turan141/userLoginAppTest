import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

const Section = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  position: relative;
  padding: 25px;
  margin: 10px;
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
  width: 70%;
`;

const RememberCheckBox = styled.input`
  border-radius: 1px solid black;
  margin-top: 5%;
`;

const ConfirmInput = styled.input`
  background-color: blue;
  border: none;
  width: 100%;
  padding-top: 2vh;
  padding-bottom: 2vh;
  border-radius: 5px;
  color: white;
  margin-top: 5%;
`;

// Types

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Label>
          Логин
          <Input defaultValue="test" {...register("example")} />
        </Label>

        {/* include validation with required or other standard HTML validation rules */}

        <Label>
          Пароль
          <Input {...register("exampleRequired", { required: true })} />
        </Label>
        {/* errors will return when field validation fails  */}
        <RememberMeDiv>
          <RememberCheckBox type="checkbox" />
          <span style={{ marginLeft: "5%" }}>Запомнить пароль</span>
        </RememberMeDiv>
        {errors.exampleRequired && <span>This field is required</span>}

        <ConfirmInput type="submit" />
      </Form>
    </Section>
  );
}
