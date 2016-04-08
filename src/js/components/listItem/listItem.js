/**
 * Created by liangningcong on 16/1/7.
 */
var React = require('react');
import { Icon, Button } from 'antd'
import AccountStore from '../../stores/AccountStore'

var Item = React.createClass({
    onClickEdit(type, index){
      AccountStore.getModifyRecord(type, index);
    },

    onClickDelete(type, index){
      confirm('确定删除该条记录?') && AccountStore.deleteOneRecord(type, index);
    },
  
    render(){
        let {type, index, data} = this.props;  
      
        return (
            <li className="incomeItem" >
                <span className="record-type">{data.type}</span>

                <Button size="small" 
                        style={{marginLeft:"10px"}}
                        onClick={this.onClickEdit.bind(this, type, index)}
                >
                  <Icon type="edit" />
                  编辑
                </Button>

              <Button size="small"
                      style={{marginLeft:"10px"}}
                      onClick={this.onClickDelete.bind(this, type, index)}
              >
                <Icon type="delete" />
                删除
              </Button>
              
                <span className="record-amount">
                    <span className="record-currency">¥</span>
                    <span className="record-money">{this.props.data.money}</span>
                </span>
            </li>
        )
    }
});

module.exports = Item;