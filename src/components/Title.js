import styled from "styled-components";

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 22px;
  margin-top: 22px;
  text-align: center;
`;

const TitleComponent = (props) => {
  return <Title>{props.text}</Title>;
};

export default TitleComponent;
