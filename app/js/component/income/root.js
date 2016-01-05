/**
 * Created by liangningcong on 16/1/4.
 */
import React from 'react';

var Income = React.createClass({
    render(){
        return (
            <div id="income" className="base-panel">
                <div className="base-panel-head">
                    <h3 className="total-title">
                        总收入
                        <span className="">CNY</span>
                    </h3>
                </div>
            </div>
        )
    }
});

export default Income;
