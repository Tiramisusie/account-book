/**
 * Created by liangningcong on 16/1/17.
 */
import React from 'react';

var Modal = React.createClass({
    getDefaultProps(){
        return {
            data: {
                name: ''
            }
        };
    },
    componentWillReceiveProps(){
        log('new record');
        $('#recordModal').modal('show');
    },
    render(){
        return(
            <div className="modal fade" id="recordModal" tabIndex="-1" role="dialog" aria-labelledby="recordModalLabel">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">{this.props.data.name}</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recordType">类型</label>
                                    <select name="recordType" id="recordType" className="form-control">
                                        <option value="1">1</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recordMoney">金额</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">￥</div>
                                        <input type="number" className="form-control" name="recordMoney" id="recordMoney" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-primary">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Modal;