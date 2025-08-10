import Mock from "mockjs";
import homeApi from "./mockServeData/home"
import userApi from "./mockServeData/user"

// 拦截接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData);
Mock.mock(/user\/getUser/, userApi.getUserList);
Mock.mock(/user\/addUser/, 'post', userApi.createUser);
Mock.mock(/user\/editUser/, 'post', userApi.updataUser);
Mock.mock(/user\/delUser/, 'post', userApi.deleteUser);
