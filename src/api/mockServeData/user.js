import Mock from "mockjs";

// get请求从config.url获取参数，post从config.body获取参数
function param2Obj(url) {
    const search = url.split("?")[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
            decodeURIComponent(search)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"') +
        '"}'
    );
}

let List = [];
const count = 20;

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock("@county(true)"),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1),
        })
    );
}

export default {
    // 获取列表
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url);
        let mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false;
            return true;
        });

        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));

        return {
            code: 20000,
            total: mockList.length,
            items: pageList
        };
    },
    // 新增用户
    createUser: config => {
        const { name, addr, age, birth, sex } = JSON.parse(config.body)
        List.unshift({
            id: Mock.Random.guid,
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex
        })
        return {
            code: 20000,
            data:{
                message: '添加成功'
            }
        }
    },
    // 编辑用户
    updataUser: config => {
        const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if(u.id === id) {
                u.name = name
                u.addr = addr
                u.age = age
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code: 20000,
            data:{
                message: '编辑成功'
            }
        }
    },
    // 删除用户
    deleteUser: config => {
        const { id } = JSON.parse(config.body)
        if(!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        }else{
            List = List.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },
}