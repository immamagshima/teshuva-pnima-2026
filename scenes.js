const SCENES = [
  {
    "title": "להגיע בשקט",
    "phases": [
      {
        "title": "תשובה פנימה",
        "text": "מפגש שקט.\nלקראת יום כיפור.",
        "seconds": 120,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "השקט שלנו",
        "text": "המיקרופונים סגורים.\nמשתפות בצ׳אט, רק אם נכון לנו.\nאפשר גם פשוט להיות כאן.",
        "seconds": 180,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "יש מקום גם לך",
        "text": "אפשר לנוח, לנוע או לצאת לרגע.\nלקשר עם קרן: הודעה פרטית בצ׳אט של הזום.",
        "seconds": 180,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "plain",
    "note": "הסכם לפני העמקה. רגע הקולות ייפתח רק בהזמנה מפורשת בסיום. אין חובה לסלוח, לדבר או לשתף.",
    "sub": "",
    "minutes": 8,
    "time": "09:00 עד 09:08"
  },
  {
    "title": "שלוש אוזניים",
    "phases": [
      {
        "title": "החוצה",
        "text": "יחד, בשקט.\nמקשיבות לצלילים שסביבנו, מחוץ לנו.\nלצליל הכי רחוק. לצליל הכי קרוב.",
        "seconds": 240,
        "chat": false,
        "visual": "listen",
        "ear": 0,
        "chatAfter": 180
      },
      {
        "title": "פנימה",
        "text": "יחד, בשקט.\nמקשיבות פנימה.\nאיזה קול בתוכך את שומעת עכשיו?",
        "seconds": 240,
        "chat": false,
        "visual": "listen",
        "ear": 1,
        "chatAfter": 180
      },
      {
        "title": "בינינו",
        "text": "יחד, בשקט.\nמקשיבות לשקט שבינינו.\nמה את שומעת כשכולנו שותקות?",
        "seconds": 240,
        "chat": false,
        "visual": "listen",
        "ear": 2,
        "chatAfter": 180
      }
    ],
    "kind": "listen",
    "note": "שלוש דקות ללא הזמנה נוספת. בדקה האחרונה מופיעה שורת שיתוף רשות, ללא מעבר מסך. אפשר גם לשים לב לאור ולמגע.",
    "sub": "",
    "minutes": 12,
    "time": "09:08 עד 09:20"
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
        "floatWords": [
          "דת",
          "שיבה",
          "בחירה",
          "דתיות",
          "לשוב",
          "חזרה",
          "בית",
          "הסכמה",
          "פתרון",
          "מענה"
        ],
        "revealAfter": 150,
        "floatStep": 5,
        "hideAfter": 240
      },
      {
        "title": "לשוב",
        "text": "",
        "seconds": 240,
        "chat": false,
        "visual": "word"
      }
    ],
    "kind": "plain",
    "note": "שתי דקות וחצי נקיות. מילים עולות, ואז נעלמות בדקה הרביעית. נשארות עם תשובה. אסוציאציות, לא שיעור לשון.",
    "sub": "",
    "minutes": 10,
    "time": "09:20 עד 09:30"
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
        "title": "מי עולה בך?",
        "text": "אפשר לתת לאדם אחד לעלות.\nאפשר גם להישאר רק עם המילה.",
        "seconds": 420,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "סליחה",
        "text": "מה עוד לא אמרתי לך?",
        "seconds": 420,
        "chat": false,
        "visual": "word",
        "chatAfter": 330
      }
    ],
    "kind": "plain",
    "note": "מפגש פנימי בלבד. אין יצירת קשר עם אדם, אין דרישה לשמות בצ׳אט, אין צורך לפתור או להגיע להחלטה.",
    "sub": "",
    "minutes": 20,
    "time": "09:30 עד 09:50"
  },
  {
    "title": "רגע לנוח",
    "phases": [
      {
        "title": "רגע לנוח",
        "text": "אפשר לשתות, לנוע, לנוח.\nנחזור ב־09:54.",
        "seconds": 240,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "plain",
    "note": "ארבע דקות הפסקה שקטה, ללא משימה.",
    "sub": "",
    "minutes": 4,
    "time": "09:50 עד 09:54"
  },
  {
    "title": "מילים לשיר",
    "phases": [
      {
        "title": "שיר מהמילים שלנו",
        "text": "השיר יישלח למשתתפות בתום המפגש.\nללא שמות. המילים עשויות לעבור עריכה.",
        "seconds": 120,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "שורה אחת",
        "text": "רוצה לתת שורה למסך ולשיר?\nכתבי בצ׳אט ״לשיר:״ ואת השורה שלך.\nרק אם נכון לך.",
        "seconds": 240,
        "chat": true,
        "visual": "horizon"
      },
      {
        "title": "המילים נשארות איתנו",
        "text": "",
        "seconds": 120,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "plain",
    "note": "אוספות09:54 עד10:00; הגשה להפקה סביב10:02. חמישים ושתיים דקות עד השמעה10:54. ההפקה חיצונית; אם טרם נבדקה הקלטה, המילים נשארות על המסך ושולחות שיר בהמשך.",
    "sub": "",
    "minutes": 8,
    "time": "09:54 עד 10:02"
  },
  {
    "title": "עיניים טובות",
    "phases": [
      {
        "title": "אני רואה אותך",
        "text": "הביטי בנשים שכאן.\nבעיניים טובות.",
        "seconds": 420,
        "chat": false,
        "visual": "eyes"
      },
      {
        "title": "סליחה",
        "text": "אפשר לתת למבט לומר אותה.\nבלי לבקש דבר בחזרה.",
        "seconds": 420,
        "chat": false,
        "visual": "eyes"
      }
    ],
    "kind": "plain",
    "note": "מבט בגלריית הזום, ללא צימוד נשים וללא חיוב במצלמה או קשר עין הדדי.",
    "sub": "",
    "minutes": 14,
    "time": "10:02 עד 10:16"
  },
  {
    "title": "סליחה שעוד מחכה",
    "phases": [
      {
        "title": "סליחה שעוד מחכה",
        "text": "אולי עוד לא ביקשתי.\nאולי עוד לא שמעתי.",
        "seconds": 420,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "כאן, כמו שאני",
        "text": "אפשר להיות כאן גם בלי לסלוח עכשיו.",
        "seconds": 420,
        "chat": false,
        "visual": "horizon",
        "chatAfter": 330
      }
    ],
    "kind": "plain",
    "note": "מקום גם לסליחה שלא נאמרה או שלא התקבלה. אין הזמנה להסביר את הסיפור או לוותר על גבול.",
    "sub": "",
    "minutes": 14,
    "time": "10:16 עד 10:30"
  },
  {
    "title": "בלי הסיפור",
    "phases": [
      {
        "title": "רגע בלי הסיפור",
        "text": "",
        "seconds": 420,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "סליחה",
        "text": "",
        "seconds": 420,
        "chat": false,
        "visual": "word"
      },
      {
        "title": "מחילה",
        "text": "",
        "seconds": 360,
        "chat": false,
        "visual": "word",
        "chatAfter": 270
      }
    ],
    "kind": "plain",
    "note": "עשרים דקות, שלושה מסכים בלבד. לא מודדות אם הלב נפתח. אפשר לעצור, לנוח או לפנות בפרטי. השקט אינו דרישה להישאר.",
    "sub": "",
    "minutes": 20,
    "time": "10:30 עד 10:50"
  },
  {
    "title": "השיר שלנו",
    "phases": [
      {
        "title": "המילים שלנו",
        "text": "",
        "seconds": 120,
        "chat": false,
        "visual": "wall"
      },
      {
        "title": "כל הקולות שלנו",
        "text": "רק עכשיו, אם תרצי, פתחי מיקרופון.\nמילה או צליל אחד, יחד.",
        "seconds": 60,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "חוזרות לשקט",
        "text": "נסגור שוב את המיקרופונים.",
        "seconds": 60,
        "chat": false,
        "visual": "horizon"
      },
      {
        "title": "להקשיב",
        "text": "שיר שנולד מהמילים שלנו.",
        "seconds": 300,
        "chat": false,
        "visual": "music"
      },
      {
        "title": "עוד רגע",
        "text": "תודה על מה שהבאתן.\nגמר חתימה טובה.",
        "seconds": 60,
        "chat": false,
        "visual": "horizon"
      }
    ],
    "kind": "wall",
    "note": "10:50 מילים,10:52 קולות,10:53 סגירת מיקרופונים,10:54 שיר,10:59 דקת שקט. אין להשמיע גרסה שלא עברה האזנה.",
    "sub": "",
    "minutes": 10,
    "time": "10:50 עד 11:00"
  }
];
