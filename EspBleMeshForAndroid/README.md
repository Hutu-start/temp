app 是总的项目入口
esp-blemesh , mesh 是项目木块
web 是前端vue项目

该项目是页面为前端vue实现,进入web文件夹
```
安装依赖
npm i


编译项目
npm run build 
```
然后 在android studio 中 运行app 即可看到效果


app->src->AndroidManifest.xml
为整个项目的配置文件

```java
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.espressif.espblemesh"> // package为当前应用的包名

		<!-- uses-permission  为需要调用的安卓权限 -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />


		<!-- application  为当前app应用配置  https://www.jianshu.com/p/d21a65e06cdb -->
    <application  
        android:name=".app.MeshApp"  //Application类的位置 当前package下的app的MeshApp文件
        android:icon="@mipmap/ic_launcher" // 配置应用各个分倍屏下的图标
        android:label="@string/app_name" // 配置应用名称
        android:roundIcon="@mipmap/ic_launcher_round" // 配置应用各个分倍屏下的round图标
        android:supportsRtl="true"  // 是否屏幕布局方向 从右到左
        android:theme="@style/AppTheme" // 主题
        tools:ignore="AllowBackup,GoogleAppIndexingWarning">
        <activity
            android:name=".ui.EspMainActivity" // activity组件的文件位置 当前package下的ui的EspMainActivity文件
            android:label="@string/app_name"
            android:screenOrientation="portrait"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>

```