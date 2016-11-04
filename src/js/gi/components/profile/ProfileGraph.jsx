/* eslint-disable */

import React from 'react';

class ProfileGraph extends React.Component {

  constructor(props) {
    super(props);
    this.format = this.format.bind(this);

    this.state = {
      bars: [
        { name: 'vet', value: this.props.veterans },
        { name: 'all', value: this.props.all }
      ]
    };

    // handle non-percentage data
    if (this.props.max !== 100) {
      for (var i in this.state.bars) {
        this.state.bars[i].percent = (this.state.bars[i].value / this.props.max) * 100;
      }

      // handle non-percentage average line
      this.state.percent = (this.props.average / this.props.max) * 100;
    }

    this.state.value = this.props.average;
  }

  format(d) {
    let val = d.value;
    if (val === null || val === undefined) {
      return 'No Data';
    } else {
      val = val.toFixed(this.props.decimals);
      while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
      }
      val = typeof d.percent !== 'undefined' ? '$' + val.replace('.0','') : val + '%';
      return val;
    }
  }

  renderBars() {
    const { width, height, split } = this.props;
    const barWidth = (width / split) / this.state.bars.length;

    const bars = [];
    for (var i in this.state.bars) {
      const value = this.state.bars[i].percent || this.state.bars[i].value;
      bars[i] = (
        <rect
            className={this.state.bars[i].name + ' graph-bar'}
            x={i * barWidth}
            y={height - value}
            height={value}
            width={barWidth}
            key={i}></rect>
      );
    }
    return bars;
  }

  renderBarLabels() {
    const { width, height, split } = this.props;
    const barWidth = (width / split) / this.state.bars.length;

    const labels = [];
    for (var i in this.state.bars) {
      const bar = this.state.bars[i];
      const x = (i * barWidth) + (barWidth / 2);
      const y = Math.min(height - (bar.percent || bar.value) + 12, height - 5);
      labels[i] = (
        <text className="graph-bar-label"
            x={x}
            y={y}
            key={i}>
          {this.format(bar)}
        </text>
      );
    }
    return labels;
  }

  renderAxis() {
    const { width, height, split } = this.props;
    return (
      <line className="graph-axis"
          x1={0}
          x2={width / split}
          y1={height}
          y2={height}>
      </line>
    );
  }

  renderAxisLabels() {
    const { width, height, padding, split } = this.props;
    const barWidth = (width / split) / this.state.bars.length;

    const labels = [];
    for (var i in this.state.bars) {
      const bar = this.state.bars[i];
      const x = (i * barWidth) + (barWidth / 2);
      const y = height + padding;
      labels[i] = (
        <text className="graph-axis-label"
            x={x}
            y={y}
            key={i}>
          {bar.name}
        </text>
      );
    }
    return labels;
  }

  renderAverageLine() {
    const { width, height, split, average } = this.props;
    const { percent } = this.state;
    const x = width / split;
    const y = height - (percent || average);
    const t = ['<', this.format(this.state), 'Nat\'l'].join(' ');
    return ([
      <line className="graph-line"
          x1={0} x2={x}
          y1={y} y2={y}
          key={0}>
      </line>,
      <text x={x} y={y} key={1}>{t}</text>
    ]);
  }

  render() {
    const { width, height, padding, split } = this.props;
    const viewBoxString = ['0', '0', width, (height + padding)].join(' ');
    return (
      <div className="graph profile-graph-component">
        <svg viewBox={viewBoxString} className="graph" width="100%" height="100%">
          <rect className="graph-background" x={0} y={0} height={height} width={width / split}></rect>
          {this.renderBars()}
          {this.renderBarLabels()}
          {this.renderAxis()}
          {this.renderAxisLabels()}
          {this.renderAverageLine()}
        </svg>
      </div>
    );
  }

}

ProfileGraph.propTypes = {
  max: React.PropTypes.number.isRequired,
  average: React.PropTypes.number.isRequired,
  veterans: React.PropTypes.number,
  all: React.PropTypes.number.isRequired,
  decimals: React.PropTypes.number
};

ProfileGraph.defaultProps = {
  max: 100,
  veterans: null,
  width: 200,
  height: 100,
  padding: 10,
  split: 1.8,
  decimals: 2
};

export default ProfileGraph;
