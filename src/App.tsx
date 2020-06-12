import React, { Component, Fragment } from "react";
import { fetchKey } from "./API";
import { ChatBubbles } from "./component/ChatBubbles";
import { ResponseBubbles } from "./component/ResponseBubbles";
import "./App.css";

export default class App extends Component {
  private scrollTarget = React.createRef<HTMLDivElement>();

  state = {
    messages: [] as Array<Message>,
    responses: [] as Array<ChoiceButton>,
  };

  componentDidMount() {
    this.fetchRequest("intro");
  }

  componentDidUpdate() {
    this.scrollToBottom(); //scroll to bottom when new message was added
  }

  render() {
    return (
      <div className="page">
        <div className="iphone">
          <div className="screen">
            <div className="statusDiv">
              <div className="status"></div>
            </div>
            <div className="content ">
              {this.state.messages.length > 0 ? (
                <Fragment>
                  <ChatBubbles messages={this.state.messages} />
                  <ResponseBubbles
                    responses={this.state.responses}
                    handleClick={this.handleClick}
                  />
                  <div
                    ref={this.scrollTarget}
                    data-explanation="This is where we scroll to"
                  ></div>
                </Fragment>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleClick = async (key_phrase: string, human_response: string) => {
    await this.setState({
      responses: [],
      messages: [
        ...this.state.messages,
        { message: human_response, sender: "human", image: false },
      ],
    });
    this.fetchRequest(key_phrase);
  };

  fetchRequest = async (key_phrase: string) => {
    await fetchKey(key_phrase).then((data) => this.setChatAndButtons(data));
  };

  setChatAndButtons = async (result: {
    bot_reply: Array<BotReply>;
    human_reply: [];
  }) => {
    result.bot_reply.map((reply: BotReply, index) =>
      this.setIndividualChat(reply.bot_response, reply.image, index)
    );
    setTimeout(
      () => this.setState({ responses: result.human_reply }),
      200 + 3000 * result.bot_reply.length
    );
  };

  setIndividualChat = async (
    bot_response: string,
    image: boolean,
    index: number
  ) => {
    console.log("test3");
    const botResponseTime = bot_response.length * 100;
    const time =
      botResponseTime < 2000
        ? 2000
        : botResponseTime > 3000
        ? 3000
        : botResponseTime;

    setTimeout(() => {
      setTimeout(
        () =>
          this.setState({
            messages: [
              ...this.state.messages,
              {
                message: "...",
                sender: "bot",
                image: false,
              },
            ],
          }),
        500
      );
      setTimeout(() => {
        this.setState({
          messages: [
            ...this.state.messages.splice(0, this.state.messages.length - 1),
          ],
        });
      }, time - 250);
      setTimeout(() => {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              message: bot_response,
              sender: "bot",
              image,
            },
          ],
        });
      }, time);
    }, 3000 * index);
  };
  scrollToBottom = () => {
    const node: HTMLDivElement | null = this.scrollTarget.current; //get the element via ref

    if (node) {
      //current ref can be null, so we have to check
      node.scrollIntoView({ behavior: "smooth" }); //scroll to the targeted element
    }
  };
}
