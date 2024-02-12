import { LocalNotifications } from '@capacitor/local-notifications';

async function scheduleNotification(title: string, body: string, id: number, schedule: Date) {

    LocalNotifications.checkPermissions().then((permission) => {
        if (permission.display !== "granted") {
            LocalNotifications.requestPermissions().then(async () => {
                await LocalNotifications.schedule({
                    notifications: [
                        {
                            title: title,
                            body: body,
                            id: id,
                            schedule: { at: schedule , allowWhileIdle: true}
                        }
                    ]
                });
            });
        }
    });

    await LocalNotifications.schedule({
        notifications: [
            {
                title: title,
                body: body,
                id: id,
                schedule: { at: schedule , allowWhileIdle: true}
            }
        ]
    });
}

export { scheduleNotification };