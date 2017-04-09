import React from "react";
import makePdfFromArgs from "./lib/pdf";
import _ from "lodash";

const PdfFrame = React.createClass({
  getInitialState() {
    return { frameSource: "" };
  },
  componentWillReceiveProps(nextProps) {
    console.log(
      _.isEqual(nextProps.pdfArgs, this.props.pdfArgs),
      nextProps.pdfArgs,
      this.props.pdfArgs
    );

    if (!_.isEqual(nextProps.pdfArgs, this.props.pdfArgs)) {
      this.refreshPdf(nextProps.pdfArgs);
    }
  },
  refreshPdf(args) {
    args.lines = args.lines || []

    const pdf = makePdfFromArgs(args);
    const startTime = window.performance.now();

    pdf.getDataUrl(url => {
      const endTime = window.performance.now();

      console.log("Timing: " + (endTime - startTime));
      this.setState({ frameSource: url });
    });
  },
  render() {
    return <iframe src={
      this.state.frameSource
    } width="900" height="500" frameBorder="0"></iframe>;
  }
});

export default PdfFrame
