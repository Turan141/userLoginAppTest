import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";

// Styles using styled-components

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
  width: 100%;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 5vh;
  padding: 5px 0px 5px 0px;
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

const ConfirmButton = styled.button`
  &:hover {
    cursor: pointer;
    background-color: red;
    transition: 0.5s ease;
  }
  background-color: blue;
  border: none;
  width: 100%;
  padding-top: 2vh;
  padding-bottom: 2vh;
  border-radius: 5px;
  color: white;
  transition: 0.5s ease;
  margin-top: 5%;
`;

const ErrorMessage = styled.div`
  width: 40vw;
  border: 1px solid red;
  background-color: rosybrown;
  border-radius: 5px;
  padding: 2vh 2% 2vh 2%;
`;

// Some Types for TS

type Inputs = {
  login: string;
  password: string;
};

export const Userprofile: FC = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    const local: boolean = Boolean(localStorage.getItem("isLoggedIn"));
    if (!local) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    checkLogin();
  };

  const userEmail = localStorage.getItem("email");
  return (
    <>
      <h1>{userEmail}</h1>
      <ConfirmButton onClick={logOutHandler}>Выйти</ConfirmButton>
    </>
  );
};

export const LoginWindow: FC = () => {
  // useFormHook
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  //I could use Redux RTK + Query for this, but they were not in must-have-stack for this project
  // Preferred to stick to useState hooks
  const [logPassFromAxios, setLogPass] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isFetching, setFetching] = useState(false);

  const navigate = useNavigate();

  // get valid log and pass from server

  useEffect(() => {
    axios
      .get(`https://api.jsonbin.io/b/624e8b815912290c00f61a41`)
      .then((res) => {
        const logpass = res.data;
        if (logpass) {
          setLogPass(logpass);
        }
      });
  }, []);

  const checkLogin = () => {
    const local: boolean = Boolean(localStorage.getItem("isLoggedIn"));
    if (local) {
      navigate("/profile");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  //check if users log and pass matches valid log/pass from server
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // imitate server response time for 1500ms with setTimeout
    setFetching(true);
    setTimeout(() => {
      if (
        data.login.trim() === logPassFromAxios.login &&
        data.password === logPassFromAxios.password
      ) {
        setShowError(false);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", data.login);
        checkLogin();
      } else {
        setShowError(true);
      }
      setFetching(false);
    }, 1500);
  };

  return (
    <Section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/*  show error message if wrong log/pass */}
        {showError ? (
          <ErrorMessage>Неправильный Логин / Пароль</ErrorMessage>
        ) : null}
        <Label>
          Логин
          <Input
            defaultValue="test"
            {...register("login", { required: true })}
          />
          {errors.login && (
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              Обязательное поле
            </span>
          )}
        </Label>
        <Label>
          Пароль
          <Input {...register("password", { required: true })} />
          {errors.password && (
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              Обязательное поле
            </span>
          )}
        </Label>
        <RememberMeDiv>
          <RememberCheckBox type="checkbox" />
          <span style={{ marginLeft: "5%" }}>Запомнить пароль</span>
        </RememberMeDiv>
        <ConfirmButton
          // for some reason i forced to use inline style
          style={isFetching ? { backgroundColor: "gray" } : {}}
          disabled={isFetching}
          type="submit"
        >
          Отправить
        </ConfirmButton>
      </Form>
      {/* <Routes>
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/login" element={<LoginWindow />} />
      </Routes> */}
    </Section>
  );
};

// App

export function App(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <>
      <h1>Main App</h1>
    </>
  );
}
