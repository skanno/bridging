# Bridging

- httpのみ対応しているAPI等を、httpsで呼べるようにします。
``` mermaid
sequenceDiagram
    participant Client
    participant Bridging
    participant API Server
    Note right of API Server: https非対応…
    Client->Bridging: httpsでリクエスト
    Bridging->API Server: httpでリクエスト
    API Server-->Bridging: レスポンス
    Bridging-->Client: レスポンス
```

- インストール方法
```bash
npm install
```

- 起動方法
```bash
node server.js&
```

- 使用方法

  以下のGETパラメータを付与し、リクエストを行う。　
  | パラメータ名 | 値 |
  | --- | ---|
  | url | URLエンコードを行ったURL |
```javascript
// 例
const url = 'https://bridging-server.com?url=http%3A%2F%2Ffugafuga.com%2Fapi.json';
request.get(url);
```
