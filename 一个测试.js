const getDatas = (list = [], max_api_num = 6, apiPromises = [], max = 100) => {
    let {promises, error_promises} = get_promises_data(apiPromises.length, max_api_num, apiPromises)
    return new Promise((resolve, reject) => {
        Promise_allSettled(promises,error_promises,resolve,reject)
    })
    function get_promises_data(apiPromises_length, max_api_num, apiPromises) {
        if (apiPromises_length === 0) {
            let promises = Array.from({length: max_api_num}, (v, k) => k).map(item => getData)
            return {
                promises, error_promises: []
            }
        }
        if (apiPromises_length > 0 && apiPromises_length < max_api_num) {
            let promises = [...Array.from({length: max_api_num - apiPromises_length}, (v, k) => k).map(item => getData), ...apiPromises];
            return {
                promises, error_promises: []
            }
        }
        if (apiPromises_length === max_api_num) {
            let promises = apiPromises;
            return {
                promises, error_promises: []
            }
        }
        if (apiPromises_length > max_api_num) {
            let promises = apiPromises.splice(0, max_api_num);
            let error_promises = apiPromises.splice(max_api_num, apiPromises_length);
            return {
                promises, error_promises
            }
        }
    }
    function getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var ok = Math.random() > 0.5  // 模拟请求成功或失败
                let data = []
                if (ok) {
                    data = [
                        {name: '张三', score: 99, time: '2021-12-22'},
                        {name: '李四', score: 60, time: '2021-12-12'},
                        {name: '王五', score: 77, time: '2021-11-08'},
                        {name: '张三', score: 99, time: '2021-12-22'},
                        {name: '李四', score: 60, time: '2021-12-12'},
                        {name: '王五', score: 77, time: '2021-11-08'},
                        {name: '张三', score: 99, time: '2022-09-22'},
                        {name: '李四', score: 91, time: '2021-12-12'},
                        {name: '王五', score: 77, time: '2021-08-08'},
                        {name: '王五', score: 77, time: '2021-11-08'}
                    ];
                    resolve(data)
                } else {
                    reject(data) // 正常的reject
                }
            }, 0)
        })
    }
    function timeEnd(time, old = '2021-12-3') {
        let timeOld = new Date(old).getTime();
        let timeNew = new Date(time).getTime();
        return timeNew > timeOld
    }
    function  Promise_allSettled(promises,error_promises,resolve,reject){
        Promise.allSettled([...promises.map(v => v())]).then(values => {
            values.forEach((v, i) => {
                if (v.status !== 'fulfilled') return error_promises.push(promises[i])
                if (v.value.length !== 0) {
                    v.value.forEach(item => {
                        if (item.score > 90 && timeEnd(item.time) && list.length < max) {
                            list.push(item)
                        }
                    })
                }
            })
            list.length >= 100 ? resolve(list.sort((x, y) => y.score - x.score)) : resolve(getDatas(list, max_api_num, error_promises, max));
        }).catch(error => {
            reject(error)
        })
    }
};
getDatas().then(res => {
    console.log(res, 'ss')
})
