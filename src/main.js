const ACCESS_TOKEN = 'ここにアクセストークンを入れる'
const REPLY_URL = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {
  let json = JSON.parse(e.postData.contents);
  let replytoken= json.events[0].replyToken;
  Logger.log(json);
  if (typeof replytoken === 'undefined') {
    return;
  }
  let message = json.events[0].message.text;
  Logger.log(message);
  UrlFetchApp.fetch(REPLY_URL, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replytoken,
      'messages': [{
        'type': 'text',
        'text': 'こんにちはlog確認',
      }],
    }),
  });
  return ContentService.createTextOutput(
    JSON.stringify({'content': 'post ok'})
  ).setMimeType(ContentService.MimeType.JSON);
}
