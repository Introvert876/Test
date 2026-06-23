# BattleEarn Notification Tester

A Firebase Cloud Messaging (FCM) testing website for the BattleEarn project.

## Features

- Generate real FCM tokens
- Request notification permission
- Save token to Firestore
- Receive foreground notifications
- Receive background notifications
- GitHub Pages compatible
- Firestore integration
- BattleEarn UID mapping

---

## Project Structure

```text
index.html
app.js
firebase-messaging-sw.js
manifest.json
404.html
README.md
```

---

## Firebase Project

Project ID:

```text
battleearn-9e3e1
```

Firestore Collection:

```text
users
```

Token Field:

```text
fcmToken
```

---

## Setup

### 1. Upload to GitHub

Upload all files to your GitHub repository.

### 2. Enable GitHub Pages

Repository

→ Settings

→ Pages

→ Deploy from Branch

→ Main

→ Root

Save.

GitHub will provide:

```text
https://YOUR_USERNAME.github.io/REPOSITORY_NAME/
```

---

## Generate Token

1. Open website
2. Click Enable Notifications
3. Allow browser notifications
4. FCM token is generated
5. Copy token if needed

---

## Save Token To Firestore

1. Enter BattleEarn UID
2. Click Save Token To Firestore
3. Website searches:

```text
users
where uid == entered_uid
```

4. Updates:

```json
{
  "fcmToken": "generated_token"
}
```

---

## Testing Apps Script

Example request:

```json
{
  "title": "BattleEarn Test",
  "body": "FCM Working Successfully",
  "token": "USER_FCM_TOKEN"
}
```

Send to your Apps Script endpoint.

---

## Foreground Notifications

Website open:

```text
Notification appears immediately
```

---

## Background Notifications

Website minimized:

```text
Native browser notification appears
```

---

## Firestore Result

Example:

```json
{
  "uid": "qqbDm4JNmMO6Nya8nlgW1",
  "fcmToken": "TOKEN_HERE",
  "tokenUpdatedAt": "2026-06-23T12:00:00Z"
}
```

---

## Troubleshooting

### Permission Denied

Check browser notification settings.

### Token Not Generated

Verify:

- Firebase config
- VAPID key
- HTTPS hosting

### Firestore Save Failed

Check:

- Firestore rules
- Collection name
- UID entered correctly

---

## BattleEarn

Used for testing Firebase Cloud Messaging before integrating notifications into the BattleEarn Flutter app.
