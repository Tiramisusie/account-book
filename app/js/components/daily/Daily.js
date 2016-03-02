import React from 'react'
import Daily from './Records'

import incomeData from '../../data/income_doc.json'
import expendData from '../../data/expend_doc.json'

export default class Main extends React.Component{
    constructor(){
        super();
        this.state = {
            incomeList: incomeData.income,
            expendList: expendData.expend
        }
    }

    render(){
        return (
            <div>
                <Daily data={incomeData.income} type="income"/>
                <Daily data={expendData.expend} type="expend"/>
            </div>
        )
    }
}