import React from 'react'
import Records from './Records'

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
            <div>
                <Records data={this.state.incomeList} type="income"/>
                <Records data={this.state.expendList} type="expend"/>
            </div>
        )
    }
}