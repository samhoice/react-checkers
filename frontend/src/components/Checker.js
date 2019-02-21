import React, { Component } from 'react'

class Checker extends Component {
    render() {
        let checker_class = 0;
        if (this.props.type === 2) {
            checker_class = "checker red-checker";
        } else if (this.props.type === 3) {
            checker_class = "checker black-checker";
        } else if (this.props.type === 4) {
            checker_class = "checker red-checker king";
        } else {
            checker_class = "checker black-checker king";
        }
        return (
            <div className={checker_class}>
                <div className="bar horizontal" />
                <div className="bar vertical" />
            </div>
        );
    }
}

export { Checker }
