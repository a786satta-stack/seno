const SECTIONS = [
  { title: 'A786 Satta क्या है?', content: `A786 Satta एक trusted online platform है जहाँ आपको सभी popular satta games के latest results, live updates और detailed charts एक ही जगह पर मिलते हैं। यह platform खासतौर पर उन users के लिए बनाया गया है जो daily basis पर accurate और fast satta updates देखना चाहते हैं।
यहाँ पर आप आसानी से Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result जैसी important updates real-time में check कर सकते हैं।` },
  { title: 'A786 Satta Results कैसे काम करते हैं?', content: `A786 Satta पर results एक structured और easy-to-understand format में दिखाए जाते हैं, जिससे users बिना confusion के latest updates check कर सकें। जब भी किसी game का result announce होता है, उसे तुरंत chart section में update कर दिया जाता है।
Users daily basis पर Faridabad Satta Live Result, Ghaziabad Satta Live  Result, Gali Satta Live Result, और Disawar Satta Live Result जैसे results देखने के लिए platform visit करते हैं। इसी तरह, gali satta live result और Ghaziabad Satta Result भी real-time में update किए जाते हैं ताकि कोई delay न हो।
हर result को simple numeric format में show किया जाता है, जिससे user जल्दी से verify कर सके कि उनका selected number match हुआ है या नहीं।` },
  { title: 'Game System कैसे काम करता है?', content: `यह system 00 से 99 तक के numbers पर आधारित होता है। Users किसी एक number को select करते हैं और result आने के बाद वही number open होने पर return मिलता है।
आजकल लोग daily updates के लिए ये terms search करते हैं:
Faridabad Satta Result
Ghaziabad Satta Result
Gali Satta Result
Disawar Satta Result
A786 Satta इन सभी updates को fast और structured तरीके से provide करता है।` },
  { title: 'A786 Satta पर Covered Games', content: `A786 Satta पर सभी major number-based games के results और charts regularly update होते हैं। Platform पर आपको multiple categories मिलती हैं, जैसे:
Delhi Bazar Satta Result
Gali Disawar Satta Result
Gajiyabad Satta Result
Faridabad Satta Result
इसके अलावा gali disawar ghaziabad  और दूसरे related updates भी regularly available रहते हैं।
हर game के लिए अलग chart section दिया गया है, जहाँ आप easily latest result और historical data check कर सकते हैं।` },
  { title: 'A786 Satta Charts को समझना', content: `A786 Satta के charts इस तरह design किए गए हैं कि कोई भी user आसानी से past data को समझ सके। Chart page पर results को day-wise, month-wise और year-wise organized किया जाता है।
Users अक्सर Faridabad Satta Chart, Ghaziabad Satta Chart, Gali Satta Chart और Disawar Satta Chart  को check करते हैं ताकि वो पुराने results compare कर सकें। इसी तरह Gali Disawar  Live Satta Result history भी chart form में available रहती है।
इस structured format की वजह से users को data समझने में आसानी होती है और उन्हें अलग-अलग sources पर जाने की जरूरत नहीं पड़ती।` },
  { title: 'A786 Satta पर Users का Trust क्यों है?', content: `Users किसी भी platform को तभी trust करते हैं जब उन्हें accurate और timely information मिले। A786 Satta का main focus यही है कि हर result और chart update सही और clear तरीके से दिया जाए।
Platform की reliability के कुछ key factors:
Regularly updated charts जैसे Disawar Satta Chart
Fast result updates जैसे gali satta result और faridabad satta result
Organized records जैसे gajiyabad satta results
Simple presentation जिससे users आसानी से समझ सकें
यही वजह है कि users daily basis पर Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result जैसे sections check करने के लिए A786 Satta पर आते हैं।` },
]

export default function SeoContent() {
  return (
    <div className="mt-8">
      {SECTIONS.map((s, i) => (
        <div key={i} className="mb-1">
          <div className="section-bar"><h2>{s.title.toUpperCase()}</h2></div>
          <div className="px-4 py-4" style={{ background: '#fff', borderBottom: '2px solid #FFE000' }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#3a3000' }}>{s.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
