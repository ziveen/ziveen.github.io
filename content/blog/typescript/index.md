---
title: Typescript踩坑笔记
date: "2019-01-09"
description: "记录使用Typescript开发React中遇到的一些坑"
---

### 自定义hooks

> 自定义hooks，如果返回的数组类型，则必须明确的表明返回的数据状态，否则返回的数据数据类型完全一致

    // 🙅‍♂️错误示例
    function useFetch() {
    	const [loading,setLoading] = useState(false);
    	const [data,setData] = useState({});
    
    	useEffect(() => {
    		// hooks使用async/await可以在内部定义一个函数
    		const fetchData = async () => {
    			let result = await axios(config);
    			setLoading(true);
    			setData(result);
    		}
    	}, [])
    
    	return [loading,data]
    }
    
    // 使用过程
    
    function App() {
    	// 此时会提示loading的数据类型为：boolean | {}
    	const [loading,data] = useFetch(**);
    
    	return  <div>1212</div>
    }
    
    // 显式的声名自定义hooks的返回数据类型就解决问题
    function useFetch(): [boolean,Object] {
    	// 上述代码
    }

### 枚举类型的数据使用

> 通用的一个场景就是：根据后端返回的任务状态码显示对应的中文状态

    // 如果不表明taskType的类型，下面的程序就会报错
    export const taskType = {
        '0': '草稿',
        '1': '完成',
        '2': '失效',
    }
    // 对应antd表格中
    const columns= [
    	{
    		title: "任务状态",
    		key: 'taskType',
    		render: (text:any, record:any) => (
    				// expression of type 'number' can't be used to index type
            <span>{taskType[text]}</span>
        )
    	}
    ];
    
    // 方案一：
    interface TaskType {
    	[key:string]: string
    }
    
    export const taskType:TaskType = {
        '0': '草稿',
        '1': '完成',
        '2': '失效',
    }
    
    // 使用枚举类型
    export enum TaskType {
    	"草稿",
    	"完成",
    	"失效"
    }