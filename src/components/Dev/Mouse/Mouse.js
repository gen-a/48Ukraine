import React, {Component} from 'react';

class Mouse extends Component{
  state = { x:0, y:0 }
  render(){
    return (
      <div onMouseMove={e => this.setState({x:e.clientX, y:e.clientY} )}>
        {this.props.children(this.state)}
      </div>
    )
  }
}
export default Mouse;