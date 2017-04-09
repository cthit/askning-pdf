import React from "react";
import PdfFrame from "./pdfFrame";
import InputTable from "./table";

const App = React.createClass({
  getInitialState() {
    return { pdfArgs: {} };
  },
  handleSubmit(event) {
    event.preventDefault();
    const dict = Array.from(event.target);
    console.log("dict", dict);
    const pdfArgs = dict.reduce(
      (obj, el) => {
        if (el.name.includes('lines_')) {
          const index = el.name.replace('lines_', '')
          console.log(el.data)
        } else if (el.name) {
          obj[el.name] = el.value;
        }
        return obj;
      },
      {lines: []}
    );
    this.setState({ pdfArgs });
  },
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Sökande</legend>
              <div>För- och efternamn på den sökande eller kommitté-/föreningsnamn om äskningen kommer från ett organ inom sektionen.</div>
              <label>Namn: <input type="text" name="committee" /></label>
            </fieldset>
            <fieldset>
              <legend>Ansvarig för äskningen</legend>
              <label>Namn: <input type="text" name="author" /></label><br/>
              <label>Telefonnummer: <input type="phone" name="phone" /></label><br/>
              <label>Mail: <input type="email" name="email" /></label>
            </fieldset>
            <fieldset>
              <legend>Motivering</legend>
              <textarea name="description" cols="30" rows="10"></textarea>
            </fieldset>
            <InputTable/>
            <button>Submit</button>
          </form>
        </div>
        <PdfFrame pdfArgs={this.state.pdfArgs} />
      </div>
    );
  }
});

export default App
