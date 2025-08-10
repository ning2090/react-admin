import { Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeTab, setCurrentMenu } from '../../store/reducers/tab'
import { useLocation, useNavigate } from "react-router-dom";
import './index.css'

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    const handleClose = (tag, index) => {
        let length = tabList.length - 1 
        dispatch(closeTab(tag))
        // 关闭的不是当前的tag
        if (tag.path !== action.pathname){
            return
        }
        if (index){
            const curData = tabList[index - 1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        }else{
            // 如果tags至少存在一个数据，则选择后一个tag
            if(tabList.length > 1){
                const nextData = tabList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }

    // 点击tag
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }
    // tag的显示
    const setTag = (flag, item, index) => {
        return (
            flag ?
            <Tag color="#55acee" closeIcon onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag>    
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
