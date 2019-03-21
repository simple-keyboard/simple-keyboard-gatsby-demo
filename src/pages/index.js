import React, { Component } from "react"
import Layout from "../components/layout"
import "simple-keyboard/build/css/index.css"

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.layoutName = "default"

    this.state = {
      input: "",
    }
  }

  componentDidMount() {
    if (window) {
      import("simple-keyboard").then(KeyboardClass => {
        const Keyboard = KeyboardClass.default

        this.keyboard = new Keyboard({
          onChange: input => this.onChange(input),
          onKeyPress: button => this.onKeyPress(button),
        })
      })
    }
  }

  onChange = input => {
    this.setState({
      input: input,
    })
    console.log("Input changed", input)
  }

  onKeyPress = button => {
    console.log("Button pressed", button)

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift()
  }

  handleShift = () => {
    let oldLayout = this.layoutName
    this.layoutName = oldLayout === "default" ? "shift" : "default"

    this.keyboard.setOptions({
      layoutName: this.layoutName,
    })
  }

  onChangeInput = event => {
    let input = event.target.value
    this.setState(
      {
        input: input,
      },
      () => {
        this.keyboard.setInput(input)
      }
    )
  }

  render() {
    return (
      <Layout>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />
        <div className={`simple-keyboard`} />
      </Layout>
    )
  }
}

export default IndexPage
