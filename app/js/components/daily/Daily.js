import React from 'react'
import Records from './Records'
import { Col } from 'antd'

export default class Main extends React.Component{
    constructor(){
        super();
        this.state = {
            incomeList: [],
            expendList: []
        }
    }

    render(){
        return (
            <Col span="20">
                <Records data={this.state.incomeList} type="income"/>
                <Records data={this.state.expendList} type="expend"/>
            </Col>
        )
    }
}