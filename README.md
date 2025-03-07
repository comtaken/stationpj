<img src="https://github.com/comtaken/stationpj/assets/65578523/a35e3200-a00e-4f16-9c69-1fbb242b9bc1" width="300">

### 環境  
node v18.12.0  
npm 8.19.2  
react-native 0.73.6

### 起動手順  
1. 以下コマンドで起動  
    > $ npx expo start
### ビルド手順  
1. app.jsonのnameを変更  
    ```  
    {
        "expo": {
            "name": "station17",  
    ```  

1. 以下コマンドでbuild
    > $ eas build -p android  
1. prettier  
    > $ npm run prettier  

### モジュールバージョン違いの対応  
npx expo start時、モジュールのバージョン違いで警告など表示は個別でモジュールのインストールが必要。  
以下の場合、picker@2.7.2 がインストールされているが、期待しているバージョンは「2.6,1」である。  
「①バージョン指定」のコマンドで期待しているバージョンのモジュールがインストール可能である。  

```
The following packages should be updated for best compatibility with the installed expo version:
  @react-native-picker/picker@2.7.2 - expected version: 2.6.1
Your project may not work correctly until you install the correct versions of the packages.
```  
  
①バージョン指定
> $ npm install @react-native-picker/picker@2.6.1
