import React from "react";

class TextFieldSubmit extends React.Component {
  state = {
    value: ""
  };

  onChange = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <form className="ui input">
        <input onChange={this.onChange} value={this.state.value} type="text" />
        <button
          className="ui primary button"
          onClick={this.handleSubmit}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default TextFieldSubmit;
