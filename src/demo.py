import requests

def test_post_method():
    # 定义 POST 请求的数据
    query = {
            'getqa': "tiquzhaiyao"
        }
    files = {
      "file":open("mrq.pdf",'rb')
    }
    # query = {'query': '你是谁？'}
    # query = {'query': '水稻稻瘟病如何进行化学防治？'}
    print(query)

    # 发送 POST 请求
    # response = requests.post('http://api.xdrv.cn:52382/blog/', data=query)
    response = requests.post('http://api.xdrv.cn:52381/zhihuijiaoyu/get_qa/', data=query)

    # 检查响应状态码
    if response.status_code == 200:
        print("POST 请求成功:")
        print(response.json())
    else:
        print("POST 请求失败:")
        print(response.text)

# 调用测试函数
test_post_method()
