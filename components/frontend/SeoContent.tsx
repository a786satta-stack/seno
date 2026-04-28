const SECTIONS = [
  { title: 'A786 Satta क्या है?', content: `A786 Satta एक trusted online platform है जहाँ आपको सभी popular satta games के latest results, live updates और detailed charts एक ही जगह पर मिलते हैं। यह platform खासतौर पर उन users के लिए बनाया गया है जो daily basis पर accurate और fast satta updates देखना चाहते हैं।
यहाँ पर आप आसानी से Faridabad Satta Result, Ghaziabad Satta Result, Gali Satta Result, और Disawar Satta Result जैसी important updates real-time में check कर सकते हैं।` },
  { title: 'A786 Satta Results कैसे काम करते हैं?', content: `A786 is a popular platform among satta players for a786 or satta Matka information like satta number result charts and previous years satta record charts. Players visit to view updated results and analyze old and new record charts displayed in a clear and organized way.` },
  { title: 'How A786 Results Work?', content: `A786 charts usually mean the entry or name you see on the result chart page of the game. These charts show the latest info for a specific time. The Number Satta results are shown in a simple format, making it easy for players to check for the latest satta results.` },
  { title: 'Understanding A786 Charts', content: `Checking A786 charts is straightforward. The chart page shows results in a simple, step-by-step manner listed by day, month, and year. Many players check older charts to compare past results with recent ones and understand patterns, keeping everything transparent.` },
  { title: 'Games Covered on A786', content: `We provide information about all famous satta games: Disawar, Faridabad, Ghaziabad, Delhi Bazar, Shri Ganesh, Hindustan, Gali Satta, Sadar Bazar, Alwar Satta and more. Charts and results for all games are updated regularly.` },
  { title: 'Why Users Trust A786?', content: `Every satta player looks for a website that provides clear explanations, reliable results, updated charts, and smooth user experience. Our main aim is to provide information in a simple and transparent manner. Well-organized records, clean design, and regularly updated charts help players stay updated without problems.` },
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
