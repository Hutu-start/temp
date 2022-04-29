package com.espressif.espblemesh.ui;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.LocationManager;
import android.os.Build;

public class PhoneStateReceiver extends BroadcastReceiver {  // 注册状态变化时广播

    public void register(Activity activity) {
        IntentFilter filter = new IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED); // 注册蓝牙变化时
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) { // 当sdk版本>= 安卓p
            filter.addAction(LocationManager.PROVIDERS_CHANGED_ACTION); // 注册定位变化时
        }
        activity.registerReceiver(this, filter);
    }

    public void unregister(Activity activity) {
        activity.unregisterReceiver(this);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        final String action = intent.getAction();
        if (action == null) {
            return;
        }

        onPhoneStateChange();
    }

    public void onPhoneStateChange() {
    }
}
