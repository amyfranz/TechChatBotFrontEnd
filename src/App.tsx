import React, { Component } from "react";
import { fetchKey } from "./API";
import { ChatBubbles } from "./component/ChatBubbles";
import { ResponseBubbles } from "./component/ResponseBubbles";
import "./App.css";

export default class App extends Component {
  private scrollTarget = React.createRef<HTMLDivElement>();

  componentDidUpdate() {
    this.scrollToBottom(); //scroll to bottom when new message was added
  }

  scrollToBottom = () => {
    const node: HTMLDivElement | null = this.scrollTarget.current; //get the element via ref

    if (node) {
      //current ref can be null, so we have to check
      node.scrollIntoView({ behavior: "smooth" }); //scroll to the targeted element
    }
  };

  state = {
    messages: [] as Array<Message>,
    responses: [] as Array<ChoiceButton>,
  };
  componentDidMount() {
    this.fetchRequest("intro");
  }
  render() {
    if (this.state.messages.length > 0)
      return (
        <div className="fullpage">
          <div className="chatApp">
            <ChatBubbles messages={this.state.messages} />
            <ResponseBubbles
              responses={this.state.responses}
              handleClick={this.handleClick}
            />
            <div
              ref={this.scrollTarget}
              data-explanation="This is where we scroll to"
            ></div>
          </div>
        </div>
      );
    else return <div></div>;
  }
  handleClick = async (key_phrase: string, human_response: string) => {
    await this.setState({
      responses: [],
      messages: [
        ...this.state.messages,
        { message: human_response, sender: "human" },
      ],
    });
    this.fetchRequest(key_phrase);
  };
  fetchRequest = async (key_phrase: string) => {
    let result: object | null = null;
    await fetchKey(key_phrase).then((data) => (result = data));
    if (result !== null) this.setChatAndButtons(result);
  };
  setChatAndButtons = async (result: {
    bot_reply: { bot_response: string };
    human_reply: [];
  }) => {
    setTimeout(
      () =>
        this.setState({
          messages: [
            ...this.state.messages,
            {
              message: result.bot_reply.bot_response,
              sender: "bot",
            },
          ],
        }),
      2000
    );
    setTimeout(() => this.setState({ responses: result.human_reply }), 3000);
  };
}
