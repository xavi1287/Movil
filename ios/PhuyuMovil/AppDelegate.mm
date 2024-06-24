#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <OneSignal/OneSignal.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"PhuyuMovil";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Inicializa OneSignal
    [OneSignal initWithLaunchOptions:launchOptions
                               appId:@"8c60d39d-cb3b-42fe-8246-ddb28eddf6ca"
           handleNotificationReceived:nil
             handleNotificationAction:nil
                             settings:@{kOSSettingsKeyAutoPrompt: @false}];
    // Request permission
    [OneSignal promptForPushNotificationsWithUserResponse:^(BOOL accepted) {
        NSLog(@"User accepted notifications: %d", accepted);
    }];
    return YES;
}
@end
