import React, { Component } from 'react';
import { Svg, Circle } from 'react-native-svg';

class CircleExample extends Component {
    static title = 'Circle';
    render() {
        return (
            <Svg height="100" width="100">
                <Circle
                    origin="50, 50"
                    rotation="-90"
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="#ddd"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="80, 160"
                />
            </Svg>
        );
    }
}
export { CircleExample };