import React from "react";

interface ResponseBubblesProps {
  responses: Array<ChoiceButton>;
  handleClick: Function;
}

export const ResponseBubbles: React.FC<ResponseBubblesProps> = ({
  responses,
  handleClick,
}) => {
  const buttons = responses.map((response, index) => (
    <button
      key={index}
      onClick={() => {
        handleClick(response.value, response.human_response);
      }}
      className="responseButton"
    >
      {response.human_response}
    </button>
  ));
  return <div className="responseButtonsDiv">{buttons}</div>;
};
