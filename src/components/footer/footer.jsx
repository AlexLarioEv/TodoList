import React, {Component} from "react";
import PropTypes from 'prop-types';

import TaskFilter from "../task-filter/task-filter"

import "./footer.css"

class Footer extends Component {

    static defaultProps = {
        filterValue: "all",
    }
     
    static propsTypes = {
        filterValue: PropTypes.string,
        unfinishedTask: PropTypes.func,
        onToggleAll: PropTypes.func,
        onToggleActive: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        onToggleCrear: PropTypes.func
    }

    render(){
        const {onToggleActive,onToggleAll,onToggleCompleted,filterValue,onToggleCrear,unfinishedTask} = this.props
        return (
            <footer className="footer">
                <span className="todo-count">{unfinishedTask()} items left</span>
                <TaskFilter
                    onToggleAll = {() => onToggleAll("all")}
                    onToggleActive = {()=>onToggleActive("active")}
                    onToggleCompleted = {()=>onToggleCompleted("completed")}
                    filterValue = {filterValue}/>
                <button className="clear-completed" onClick={onToggleCrear}>Clear completed</button>
            </footer>
        )  
    }
}

export default Footer