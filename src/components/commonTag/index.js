import { Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeTab } from '../../store/reducers/tab'
import './index.css'

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const handleClose = (tag) => {
        dispatch(closeTab(tag))
    }

    // 点击tag
    const handleChange = (tag) => {

    }
    // tag的显示
    const setTag = (flag, item, index) => {
        return (
            flag ?
            <Tag color="#55acee" closeIcon onClose={() => handleClose(item, index)}>{item.label}</Tag>    
            :
            <Tag onClick={() => handleChange(item)} key={item.name}>{item.label}</Tag>      
        )
    }

    return (
        <Space className="common-tag" size={[0-8]} wrap>
            {/* <Tag>首页</Tag>
            <Tag color="#55acee" closeIcon onClose={() => handleClose()}>
                用户列表
            </Tag> */}
            {
                currentMenu.name && tabList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
            }
        </Space>
    )
}

export default CommonTag