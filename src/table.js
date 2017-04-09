import React from 'react'

const renderInputLine = ([text, value], index, removeLine) => {
  return <div key={index}>
    <input type="text" data={{index}} name={"line_text"} value={text} />
    <input type="number" data={{index}} name={"line_value"} value={value} />
    <button onClick={removeLine}>Ta bort</button>
  </div>
}

const Table = React.createClass({
  getInitialState() {
    return {
      lines: [
        ["", 0]
      ]
    }
  },
  removeIndex(index) {
    const lines = this.state.lines.filter((el, i) => i !== index)
    this.setState({ lines })
  },
  addLine() {
    this.setState({
      lines: [...this.state.lines, ["", 0]]
    })
  },
  render() {
    const { lines } = this.state
    return <div>
      {lines.map((line, index) => renderInputLine(line, index, () => this.removeIndex(index)))}
      <button onClick={this.addLine}>Lägg till rad</button>
    </div>
  }
})


export default Table