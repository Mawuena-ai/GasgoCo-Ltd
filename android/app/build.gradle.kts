android {
    namespace = "com.mawuena.gasgo"
    compileSdkVersion(34)

    ndkVersion = "26.3.11579264" // Add this line here

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/tools/build-tools/application-id.html).
        applicationId = "com.mawuena.gasgo"
        minSdkVersion(21)
        targetSdkVersion(34)
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = debug.signingConfig
        }
    }
}