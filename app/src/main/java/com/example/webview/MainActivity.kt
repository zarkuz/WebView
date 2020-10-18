package com.example.webview

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val webviewku: WebView = findViewById(R.id.webviewku)
        webviewku.settings.javaScriptEnabled = true
//        webviewku.loadUrl("https://www.w3schools.com/")
        webviewku.loadUrl("file:///android_asset/kenal_indonesia/index.html")
    }
}