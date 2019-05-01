import React from "react";

class TextFieldSubmit extends React.Component {
  state = {
    value: ""
  };

  onChange = e => this.setState({ value: e.target.value });

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <div className="ui input">
        <input onChange={this.onChange} value={this.state.value} type="text" />
        <button
          className="ui  primary button"
          onClick={this.handleSubmit}
          type="submit"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default TextFieldSubmit;
