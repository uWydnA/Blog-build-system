import React, { Component } from 'react'
import { Table,Button ,Tag} from 'antd';
import './role.css';
import { SearchOutlined } from '@ant-design/icons';

export default class Role extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <div>
                          <Button type="primary" shape="circle" icon={<SearchOutlined />} disabled={true}/>
                </div>,
            }
        ],
        datalist: []

    }
    componentDidMount() {
      React.$axios.get("http://localhost:12138/roles").then(res => {
            this.setState({
                datalist: res.data
            })
        })
    }

    render() {
        return (
            <Table
                columns={this.state.columns}
                dataSource={this.state.datalist}
                rowKey= {item=>{
                    return item.id
                }}
                

                expandable={{
                    expandedRowRender: record => {
                        return <div style={{ margin: 0 }}>
                        {
                            record.roleRight.map(item=>
                               <div key={item.category}>
                                   {
                                       item.list.map(data=>
                                        <Tag color={"green"} key={data}>{data}</Tag>
                                        )
                                   }
                               </div> 
                            )
                        }
                    </div>
                    },
                }}
            />
        )
    }
}
