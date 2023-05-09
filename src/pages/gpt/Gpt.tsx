import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { getData } from "./getData";
import { useForm } from "react-hook-form";
import generateText from "./generateText";
import { IIsResult, IPramas } from "./type";
import Result from "./Result";
function App() {
  const { register, getValues, handleSubmit } = useForm<IPramas>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<IIsResult | undefined>();
  const result_length = [300, 400, 500, 600, 700, 800];
  const getResult = async () => {
    const params = getValues("params");
    console.log(params.length);
    const prompt = generateText({ params });
    setIsLoading(true);
    const result = await getData(prompt);
    setIsResult(result.data);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <Container>
          <Form onSubmit={handleSubmit(getResult)}>
            <Img />
            <Content>
              <span>회사명</span>
              <Input
                {...register("params.company_name")}
                placeholder="회사명을 입력해주세요"
              />
            </Content>
            <Content>
              <span>부서명</span>
              <Input
                {...register("params.depart")}
                placeholder="부서명을 입력해주세요"
              />
            </Content>
            <Content>
              <span>이름</span>
              <Input
                {...register("params.user_name")}
                placeholder="이름을 입력해주세요"
              />
            </Content>
            <Content>
              <span>질문을 입력해주세요</span>
              <Input
                {...register("params.qes")}
                placeholder="질문을 입력해주세요"
              />
            </Content>
            <LastContent>
              <Check onClick={() => setShow((prev) => !prev)} type="checkbox" />
              <Span>내용을 넣고싶은가요?</Span>
              <Select {...register("params.length")}>
                {result_length.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
              <SubmitBtn>제출</SubmitBtn>
            </LastContent>
            {show && (
              <Textarea
                {...register("params.text")}
                placeholder="넣고싶은 내용을 적으세요"
              ></Textarea>
            )}
          </Form>
          <Result isResult={isResult} setIsResult={setIsResult} />
        </Container>
      )}
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Form = styled.form`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 120px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 10px;
    font-size: 0.8rem;
  }
`;

const Img = styled.img`
  width: 250px;
  height: 200px;
  margin-bottom: 60px;
`;

const Check = styled.input`
  width: 18px;
  height: 18px;

  background: #ffffff;
  border: 1.3px solid #414c38;
  border-radius: 4px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #afd082;
  padding: 10px 20px;
  margin-bottom: 20px;
  width: 240px;
  outline: none;
`;

const Span = styled.span`
  font-size: 0.7rem;
  margin-right: 20px;
`;

const LastContent = styled.div`
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: 2px 6px;
  background-color: white;
  border: 1.3px solid #414c38;
  border-radius: 8px;
  margin-right: 5px;
`;

const SubmitBtn = styled.button`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 4px 10px;
`;

const Textarea = styled.textarea`
  resize: none;
  width: 480px;
  height: 140px;
  margin-top: 40px;
  padding: 10px 12px;
  border-radius: 12px;
  outline: none;
`;