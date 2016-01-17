/**
 * Created by liangningcong on 16/1/4.
 */
import React from 'react';

var Outcome = React.createClass({
   render(){
       return (
           <div id="outcome" className="base-panel">
               <div className="base-panel-head">
                   <h3 className="total-title">
                       总支出
                       <span className="">CNY</span>
                       <span className="total-num">100</span>
                   </h3>
               </div>
           </div>
       )
   }
});

export default Outcome;