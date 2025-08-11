import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: "tab",
    initialState: {
        isCollapsed: false,
        tabList: [
            {
                path: '/home',
                name: 'home',
                label: '首页'
            }
        ],
        currentMenu: {
            path: '/home',
            name: 'home',
            label: '首页'
        }
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapsed = !state.isCollapsed
        },
        selectMenuList: (state, {payload:val}) => {
            if(val.name !== 'home') {
                state.currentMenu = val
                // 已存在的tag不需要添加
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result === -1){
                    state.tabList.push(val)
                }
            } else if(val.name === 'home') {
                state.currentMenu = val
            }
        },
        closeTab: (state,{payload:val}) => {
            let res = state.tabList.findIndex(item => item.name === val.name)
            if (res !== -1) {
                state.tabList.splice(res, 1)
            }
        },
        setCurrentMenu:(state, {payload:val}) =>{
            state.currentMenu = val
        },
        closeOtherTabs: (state, {payload: val}) => {
            state.tabList = [val]
            state.currentMenu = val
        },
        closeAllTabs: (state) => {
            state.tabList = [{
                path: '/home',
                name: 'home',
                label: '首页'
            }]
            state.currentMenu = {
                path: '/home',
                name: 'home',
                label: '首页'
            }
        }
    }
})

export const { collapseMenu, selectMenuList, closeTab, setCurrentMenu, closeOtherTabs, closeAllTabs } = tabSlice.actions
export default tabSlice.reducer
