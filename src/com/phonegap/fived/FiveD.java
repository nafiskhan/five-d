package com.phonegap.fived;

//import android.app.Activity;
import org.apache.cordova.DroidGap;
import android.os.Bundle;

public class FiveD extends DroidGap
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
