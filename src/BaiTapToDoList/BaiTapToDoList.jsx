import React, { Component } from 'react';
import {connect} from 'react-redux';
import {arrTheme} from '../Themes/ThemeManager';
import { ThemeProvider } from 'styled-components';
import { Container } from '../Components/Container';
import { Dropdown } from '../Components/Dropdown';
import { Heading1,Heading2,Heading3,Heading4,Heading5 } from '../Components/Heading';
import { TextField } from '../Components/TextField';
import { Button } from '../Components/Button';
import { Table,Thead,Tbody,Tr,Th,Td } from '../Components/Table';
import { actionChangeTheme, actionAddTask, actionDoneTask, actionDeleteTask, actionEditTask, actionUpdateTask } from '../redux/actions/BaiTapToDoListActions';

class BaiTapToDoList extends Component {

    state = {
        taskName: '',
        disabled: true,
    }

    renderTheme = () => {
        return arrTheme.map((theme, index) =>{
            return <option value={theme.id} key={index}>
                {theme.name}
            </option>
        })
    }

    renderTaskToDo = () => {
        return this.props.taskList.filter(task => !task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{verticalAlign:'middle'}}>{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={() =>{
                        this.setState({
                            disabled: false
                        },()=>{
                            this.props.dispatch(actionEditTask(task))
                        })
                    }} ><i className="fa fa-edit"></i></Button>
                    <Button onClick={() =>{
                        this.props.dispatch(actionDoneTask(task.id))
                    }} className="ml-1"><i className="fa fa-check"></i></Button>
                    <Button onClick={() =>{
                        this.props.dispatch(actionDeleteTask(task.id))
                    }} className="ml-1"><i className="fa fa-trash"></i></Button>
                </Th>
            </Tr>
        })
    }

    renderTaskCompleted = () => {
        return this.props.taskList.filter(task => task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{verticalAlign:'middle'}}>{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={() =>{
                        this.props.dispatch(actionDeleteTask(task.id))
                    }} className="ml-1"><i className="fa fa-trash"></i></Button>
                </Th>
            </Tr>
        })
    }

    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList}>
                <Container className="w-50">
                    <Dropdown onChange={(e) => {
                        let {value} = e.target;
                        this.props.dispatch(actionChangeTheme(value));
                    }}>
                        {this.renderTheme()}
                    </Dropdown>
                    <Heading2>To do list</Heading2>
                    <TextField value={this.state.taskName} onChange={(e) => {
                        this.setState({
                            taskName: e.target.value
                        })
                    }} name="taskName" label="Task name" className="w-50"  />
                    <Button className="ml-2" onClick={() =>{
                        let {taskName} = this.state;
                        let newTask = {
                            id:Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        this.props.dispatch(actionAddTask(newTask))
                    }}><i className="fa fa-plus"></i> Add task</Button>
                    {
                        this.state.disabled ? <Button className="ml-2" disabled onClick={() => {
                            this.props.dispatch(actionUpdateTask(this.state.taskName))
                        }}><i className="fa fa-upload"></i> Update task</Button> : <Button className="ml-2" onClick={() => {
                            let {taskName} = this.state;
                            this.setState({
                                taskName: '',
                                disabled: true
                            },()=>{
                                this.props.dispatch(actionUpdateTask(taskName))
                            })
                        }}><i className="fa fa-upload"></i> Update task</Button>
                    }
                    <hr />
                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>
                    </Table>
                    <Heading3>Task completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}
                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        themeToDoList: state.BaiTapToDoListReducer.themeToDoList,
        taskList: state.BaiTapToDoListReducer.taskList,
        taskEdit: state.BaiTapToDoListReducer.taskEdit
    }
}

export default connect(mapStateToProps)(BaiTapToDoList)