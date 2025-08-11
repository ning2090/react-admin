import { Tag, Space, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeTab, setCurrentMenu, closeOtherTabs, closeAllTabs } from '../../store/reducers/tab'
import { useLocation, useNavigate } from "react-router-dom";
import './index.css'

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // 关闭标签
    const handleClose = (tag, index) => {
        // 不能关闭最后一个标签
        if (tabList.length === 1) {
            return
        }

        dispatch(closeTab(tag))
        
        // 如果关闭的是当前标签，需要跳转到其他标签
        if (tag.path === location.pathname) {
            let targetTab
            if (index === tabList.length - 1) {
                // 关闭的是最后一个，跳转到前一个
                targetTab = tabList[index - 1]
            } else {
                // 关闭的不是最后一个，跳转到后一个
                targetTab = tabList[index + 1]
            }
            dispatch(setCurrentMenu(targetTab))
            navigate(targetTab.path)
        }
    }

    // 点击标签
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }

    // 右键菜单项
    const getContextMenuItems = (tag, index) => {
        const items = [
            {
                key: 'refresh',
                label: '刷新页面',
                onClick: () => {
                    window.location.reload()
                }
            },
            {
                key: 'close',
                label: '关闭标签',
                disabled: tabList.length === 1,
                onClick: () => handleClose(tag, index)
            },
            {
                key: 'closeOthers',
                label: '关闭其他标签',
                disabled: tabList.length === 1,
                onClick: () => {
                    dispatch(closeOtherTabs(tag))
                    navigate(tag.path)
                }
            },
            {
                key: 'closeAll',
                label: '关闭所有标签',
                onClick: () => {
                    dispatch(closeAllTabs())
                    navigate('/home')
                }
            }
        ]
        return items
    }

    // 渲染标签
    const renderTag = (item, index) => {
        const isActive = item.path === currentMenu.path
        
        return (
            <Dropdown
                key={item.name}
                menu={{ items: getContextMenuItems(item, index) }}
                trigger={['contextMenu']}
            >
                <Tag
                    className={`tab-tag ${isActive ? 'active' : ''}`}
                    color={isActive ? '#1890ff' : undefined}
                    closable={tabList.length > 1}
                    onClose={(e) => {
                        e.preventDefault()
                        handleClose(item, index)
                    }}
                    onClick={() => handleChange(item)}
                >
                    {item.label}
                </Tag>
            </Dropdown>
        )
    }

    return (
        <div className="common-tag">
            <Space size={[0, 8]} wrap>
                {tabList.map((item, index) => renderTag(item, index))}
            </Space>
        </div>
    )
}

export default CommonTag
