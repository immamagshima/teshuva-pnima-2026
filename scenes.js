const SCENES = [
  {
    "title": "להגיע בשקט",
    "phases": [
      {
        "title": "תשובה פנימה",
        "text": "מפגש שקט לקראת יום כיפור.\nרציתי שנעצור יחד,\nלסליחה שעוד לא מצאה מילים.",
        "seconds": 120,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "השקט שלנו",
        "text": "המיקרופונים סגורים.\nמשתפות בצ׳אט, רק אם נכון לנו.\nאפשר גם פשוט להיות כאן.",
        "seconds": 120,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "יש מקום גם לך",
        "text": "אפשר לנוח, לנוע או לצאת לרגע.\nלקשר עם קרן: הודעה פרטית בצ׳אט של הזום.",
        "seconds": 120,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "plain",
    "note": "הסכם לפני העמקה. רגע הקולות ייפתח רק בהזמנה מפורשת בסיום. אין חובה לסלוח, לדבר או לשתף.",
    "sub": "",
    "minutes": 6,
    "time": "09:00 עד 09:06"
  },
  {
    "title": "שלוש אוזניים",
    "phases": [
      {
        "title": "החוצה",
        "text": "יחד, בשקט.\nמקשיבות לצלילים שסביבנו, מחוץ לנו.\nלצליל הכי רחוק. לצליל הכי קרוב.",
        "seconds": 300,
        "chat": false,
        "visual": "listen",
        "ear": 0,
        "chatAfter": 180
      },
      {
        "title": "פנימה",
        "text": "יחד, בשקט.\nמקשיבות פנימה.\nאיזה קול בתוכך את שומעת עכשיו?",
        "seconds": 300,
        "chat": false,
        "visual": "listen",
        "ear": 1,
        "chatAfter": 180,
        "voices": [
          "אני צריכה להספיק",
          "מה עושים פה?",
          "אני לא יכולה בשקט הזה",
          "אוף, כואבת לי הרגל",
          "מה עכשיו?",
          "שכחתי משהו",
          "מתי כבר אצליח לנוח?",
          "אולי פשוט להיות"
        ],
        "voiceAfter": 90,
        "voiceUntil": 180
      },
      {
        "title": "בינינו",
        "text": "יחד, בשקט.\nמקשיבות לשקט שבינינו.\nמה את שומעת כשכולנו שותקות?",
        "seconds": 300,
        "chat": false,
        "visual": "listen",
        "ear": 2,
        "chatAfter": 180
      }
    ],
    "kind": "listen",
    "note": "שלוש דקות ללא הזמנה נוספת. בדקה האחרונה מופיעה שורת שיתוף רשות, ללא מעבר מסך. אפשר גם לשים לב לאור ולמגע.",
    "sub": "",
    "minutes": 15,
    "time": "09:06 עד 09:21"
  },
  {
    "title": "תשובה",
    "phases": [
      {
        "title": "תשובה",
        "text": "",
        "seconds": 360,
        "chat": false,
        "visual": "word",
        "revealAfter": 150,
        "floatStep": 5,
        "hideAfter": 240,
        "morph": [
          "תשובה",
          "לשוב",
          "שיבה",
          "שבה",
          "תשובה"
        ],
        "morphAfter": 150
      },
      {
        "title": "לשוב",
        "text": "אל עצמי.",
        "seconds": 240,
        "chat": false,
        "visual": "word",
        "voices": [
          "אל הגוף",
          "אל השקט",
          "אל הלב",
          "אל הבית",
          "אל הקול שלי",
          "אל עצמי"
        ],
        "voiceAfter": 60,
        "voiceUntil": 210
      }
    ],
    "kind": "plain",
    "note": "שתי דקות וחצי עם תשובה. אחר כך האותיות נפרדות ונפגשות שוב. הקצב נובע מטיימר השהייה ונעצר יחד איתו.",
    "sub": "",
    "minutes": 10,
    "time": "09:21 עד 09:31"
  },
  {
    "title": "סליחה ואדם",
    "phases": [
      {
        "title": "סליחה",
        "text": "",
        "seconds": 360,
        "chat": false,
        "visual": "word"
      },
      {
        "title": "סליחה",
        "text": "ממי אני רוצה לבקש סליחה עכשיו?",
        "seconds": 360,
        "chat": false,
        "visual": "horizon",
        "linePortrait": true
      },
      {
        "title": "סליחה",
        "text": "סליחה שעוד לא אמרתי לך…",
        "seconds": 360,
        "chat": false,
        "visual": "word"
      }
    ],
    "kind": "plain",
    "note": "מפגש פנימי בלבד. אין יצירת קשר עם אדם, אין דרישה לשמות בצ׳אט, אין צורך לפתור או להגיע להחלטה.",
    "sub": "",
    "minutes": 18,
    "time": "09:31 עד 09:49"
  },
  {
    "title": "רגע לנוח",
    "phases": [
      {
        "title": "רגע לנוח",
        "text": "אפשר לשתות, לנוע, לנוח.\nנחזור ב־09:52.",
        "seconds": 180,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "plain",
    "note": "שלוש דקות הפסקה שקטה.",
    "sub": "",
    "minutes": 3,
    "time": "09:49 עד 09:52"
  },
  {
    "title": "מילים לשיר",
    "phases": [
      {
        "title": "שיר מהמילים שלנו",
        "text": "שיר מהמילים שנבחר לתת.\nללא שמות. המילים עשויות לעבור עריכה.\nהשיר יישלח למשתתפות בתום המפגש.",
        "seconds": 60,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "סליחה…",
        "text": "אם נכון לך, כתבי בצ׳אט:\n״לשיר: סליחה…״ והמשיכי במילים שלך.\nהשורה תוכל להופיע על המסך ולהיכנס לשיר.",
        "seconds": 240,
        "chat": true,
        "visual": "horizon"
      },
      {
        "title": "המילים נשארות איתנו",
        "text": "",
        "seconds": 60,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "plain",
    "note": "09:52 הזמנה לשיר. עד 09:58 איסוף והעתקה להפקה חיצונית. השמעה ב־10:25 רק אחרי האזנה.",
    "sub": "",
    "minutes": 6,
    "time": "09:52 עד 09:58"
  },
  {
    "title": "עיניים טובות",
    "phases": [
      {
        "title": "אני רואה אותך",
        "text": "הביטי בנשים שכאן.\nבעיניים טובות.",
        "seconds": 300,
        "chat": false,
        "visual": "eyes"
      },
      {
        "title": "סליחה",
        "text": "אפשר לתת למבט לומר אותה.\nבלי לבקש דבר בחזרה.",
        "seconds": 300,
        "chat": false,
        "visual": "eyes"
      }
    ],
    "kind": "plain",
    "note": "מבט בגלריית הזום, ללא צימוד נשים וללא חיוב במצלמה או קשר עין הדדי.",
    "sub": "",
    "minutes": 10,
    "time": "09:58 עד 10:08"
  },
  {
    "title": "סליחה שעוד מחכה",
    "phases": [
      {
        "title": "סליחה שעוד מחכה",
        "text": "אולי עוד לא ביקשתי.\nאולי עוד לא שמעתי.",
        "seconds": 300,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "כאן, כמו שאני",
        "text": "אפשר להיות כאן גם בלי לסלוח עכשיו.",
        "seconds": 300,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "plain",
    "note": "מקום גם לסליחה שלא נאמרה או שלא התקבלה. אין הזמנה להסביר את הסיפור או לוותר על גבול.",
    "sub": "",
    "minutes": 10,
    "time": "10:08 עד 10:18"
  },
  {
    "title": "בלי הסיפור",
    "phases": [
      {
        "title": "סליחה",
        "text": "",
        "seconds": 300,
        "chat": false,
        "visual": "word"
      }
    ],
    "kind": "plain",
    "note": "חמש דקות עם מילה אחת. בלי שאלה נוספת ובלי משימה.",
    "sub": "",
    "minutes": 5,
    "time": "10:18 עד 10:23"
  },
  {
    "title": "השיר שלנו",
    "phases": [
      {
        "title": "המילים שלנו",
        "text": "",
        "seconds": 60,
        "chat": false,
        "visual": "wall"
      },
      {
        "title": "כל הקולות שלנו",
        "text": "רק עכשיו, אם תרצי, פתחי מיקרופון.\nמילה או צליל אחד, יחד.",
        "seconds": 30,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "חוזרות לשקט",
        "text": "נסגור שוב את המיקרופונים.",
        "seconds": 30,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "להקשיב",
        "text": "שיר שנולד מהמילים שלנו.",
        "seconds": 240,
        "chat": false,
        "visual": "music"
      },
      {
        "title": "עוד רגע",
        "text": "קחי איתך מילה אחת שנשארה בך.\nתודה שהיית כאן.\nגמר חתימה טובה.",
        "seconds": 60,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "wall",
    "note": "10:23 המילים שלנו,10:24 קולות,10:24:30 סגירת מיקרופונים,10:25 שיר,10:29 דקת שקט. סיום10:30.",
    "sub": "",
    "minutes": 7,
    "time": "10:23 עד 10:30"
  }
];
