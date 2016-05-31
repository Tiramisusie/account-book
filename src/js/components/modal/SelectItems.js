/**
 * Created by liangningcong on 16/5/31.
 */
import React from 'react'

//支出项目
let expendItems = ['用餐', '购物', '娱乐', '丽人', '聚会', '约会', '交通', '零食', '医疗', '服饰', '住房', '话费', '学习'];

//收入项目
let incomeItems = ['工资', '股票', '奖金', '报销', '生活费', '零花钱'];

export default class SelectItems extends React.Component{
  
  static propTypes = {
    type: React.PropTypes.string
  };

  handleClick(e,item){
    e.preventDefault();
    let modal = $('.recordType:visible')[0];
    $(modal).val(item);
  }

  renderItem(type){
    let items;
    
    if(type === 'income'){
      items = incomeItems;  
    } else {
      items = expendItems;
    }
    
    return items.map( (item, i)=>{
      return <li key={"item"+i} className="select-items" onClick={(e)=>{this.handleClick(e,item)}}>{item}</li>
    })
  }
  
  render() {
    return(
      <section className="select-item-container">
        <ul>
          {this.renderItem(this.props.type)}
        </ul>
      </section>
    )
  }
}