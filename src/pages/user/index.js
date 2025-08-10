import React,{ useEffect, useState } from "react"
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from "antd";
import "./user.css"
import { getUser, addUser, editUser, delUser } from "../../api";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";

const User = () => {
    const [ listData, setListData ] = useState({
        name: ''
    });
    const [ tableData, setTableData ] = useState([]);
    // 0新增 1编辑
    const [ modelType, setModelType ] = useState(0)
    const [ isModelOpen, setIsModelOpen ] = useState(false)
    // 创建form实例
    const [form] = Form.useForm();
    // 新增
    const handleClick = (type, rowData) => {
        setIsModelOpen(!isModelOpen)
        if(type == 'add'){
            setModelType(0)
        }else{
            setModelType(1)
            const cloneData = JSON.parse(JSON.stringify(rowData))
            cloneData.birth = dayjs(cloneData.birth)
            // 表单数据回填
            form.setFieldsValue(cloneData)
        }
    };

    // 提交
    const handleFinish = (e) => {
        setListData({
            name: e.keyword
        })
    }
    useEffect(() => {
        getTableData()
    },[listData])

    // 删除
    const handleDelete = ({id}) => {
        delUser({id}).then(() => {
            getTableData()
        })
    }

    const getTableData = () => {
        getUser(listData).then(({data}) => {
            console.log(data);
            setTableData(data.items);
        })
    }

    // 弹窗确定
    const handleOk = () => {
        // 表单校验
        form.validateFields().then((val) => {
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            if(modelType){
                editUser(val).then(() => {
                    handleCancel()
                    getTableData()
                })
            }else{
                addUser(val).then(() => {
                    handleCancel()
                    getTableData()
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    // 弹窗取消
    const handleCancel = () => {
        setIsModelOpen(false)
        form.resetFields()
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 140,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: 140,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 140,
            render: (val) => {
                return val ? '女' : '男';
            }
        },
        {
            title: '出生日期',
            dataIndex: 'birth',
            width: 200,
        },
        {
            title: '地址',
            dataIndex: 'addr',
            width: 400,
        },
        {
            title: '操作',
            render: (rowData) => {
                return (
                    <div className="flex-box">
                        <Button style={{ marginRight:'5px' }} onClick={() => handleClick('edit', rowData)}>编辑</Button>
                        <Popconfirm 
                            title="提示" 
                            description="此操作将删除该用户，是否继续？" 
                            okText="确定" 
                            cancelText="取消"
                            onConfirm={() => handleDelete(rowData)}
                        >
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>                       
                    </div>
                );
            }
        },
    ];

    useEffect(() => {
        // 获取用户列表数据
        getTableData();
    }, []);
    return (
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
                <Form layout="inline" onFinish={handleFinish}>
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table style={{marginTop:'10px'}} columns={columns} dataSource={tableData} rowKey={'id'} />
            <Modal 
                title={ modelType ? '编辑用户' : '新增用户' }
                open={isModelOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
                bodyStyle={{ paddingTop: '10px' }}
            >
                <Form
                    form={form}
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 18
                    }}
                    labelAlign="left"
                >
                    { modelType == 1 && 
                        <FormItem name="id" hidden><Input /></FormItem>
                    }
                    <FormItem
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名'
                            }
                        ]}
                    >
                        <Input placeholder="请输入姓名"/>
                    </FormItem>
                    <FormItem
                        label="年龄"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: '请输入年龄'
                            },
                            {
                                type: 'number',
                                message: '年龄必须是数字'
                            }
                        ]}
                    >
                        <InputNumber placeholder="请输入"/>
                    </FormItem>
                    <FormItem
                        label="性别"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: '性别是必选'
                            }
                        ]}
                    >
                        <Select placeholder='请选择性别' options={[{value:0,label:'男'},{value:1,label:'女'}]}/>
                    </FormItem>
                    <FormItem
                        label="出生日期"
                        name="birth"
                        rules={[
                            {
                                required: true,
                                message: '请选择出生日期'
                            }
                        ]}
                    >
                        <DatePicker placeholder="请选择" format="YYYY/MM/DD"/>
                    </FormItem>
                    <FormItem
                        label="地址"
                        name="addr"
                        rules={[
                            {
                                required: true,
                                message: '请输入地址'
                            }
                        ]}
                    >
                        <Input placeholder="请输入地址"/>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
}

export default User