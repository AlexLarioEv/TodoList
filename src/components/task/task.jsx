import React, {Component} from "react";
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'

import "./task.css"

class Task  extends Component {
  
  state ={
    label: this.props.label
  }
  
  static defaultProps = {
    date: new Date(),
    label: "Task",
    done: false,
    change: false
  }

  static propsTypes = {
    date:   PropTypes.number,
    label:  PropTypes.string,
    done:   PropTypes.bool,
    change: PropTypes.bool,
    onToggleChange: PropTypes.func,
    onToggleDone:   PropTypes.func
  }

  onChange = (e) =>{
    this.setState(({
      label: e.target.value
    }))
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onRename(this.props.id, this.state.label)
  
  } 

  render(){
    

    const {label, onToggleDone,onToggleChange , done, change, date} = this.props;

    let className;
    let editingTask;

    if (done) {
      className ="completed"
    }

    if (change) {
      className = "editing"
    }

    if (className ==="editing"){
      editingTask = (
        <form className="form-task" onSubmit={this.onSubmit}>
          <input type="text" className="edit" defaultValue={label} onChange={this.onChange}/>
        </form>
        )
      }
    
      return(
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done? true:false} />
          <label>
            <span className="description" > {label}</span>
            <span className="created">{formatDistanceToNow(date, { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleChange}></button>
          <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
        {editingTask}
      </li>
    )
  }
}

Task.defaultProps = {
  date: new Date(),
  label: "Task",
  done: false,
  change: false
}

Task.propsTypes = {
  date:   PropTypes.number,
  label:  PropTypes.string,
  done:   PropTypes.bool,
  change: PropTypes.bool,
  onToggleChange: PropTypes.func,
  onToggleDone:   PropTypes.func
}


export default Task;
