import React, {Component} from "react";

import "./task.css"

class Task  extends Component {

  state ={
    label: this.props.label
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
    const {label, onToggleDone,onToggleChange , done, change} = this.props;
    let className;
    if (done) {
      className ="completed"
    }

    if (change) {
      className = "editing"
    }

    
    const editingTask = () => {
      if (className ==="editing"){
        return (
          <form className="form-task" onSubmit={this.onSubmit}>
            <input type="text" className="edit" defaultValue={label} onChange={this.onChange}/>
          </form>
          )
        }
      }
    
      return(
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done? true:false} />
          <label>
            <span className="description" > {label}</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleChange}></button>
          <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
        {editingTask()}
      </li>
    )
  }
}




export default Task;
