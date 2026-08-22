const SECTIONS = [
  {
    title: 'A786 Satta क्या है?',
    content: (
      <>
        <p>
          <strong>A786Satta</strong> एक online results and charts platform है
          जहाँ popular markets के latest results, daily updates और historical
          charts एक ही जगह पर उपलब्ध हैं। Website को simple और organized
          format में बनाया गया है ताकि users relevant information आसानी से
          find कर सकें।
        </p>

        <p className="mt-3">
          यहाँ Faridabad, Ghaziabad, Gali और Disawar जैसे popular sections के
          results और chart information उपलब्ध हैं।
        </p>
      </>
    ),
  },

  {
    title: 'A786 Satta Results कैसे काम करते हैं?',
    content: (
      <>
        <p>
          <strong>A786 Satta</strong> पर results को structured और
          easy-to-understand format में organize किया जाता है। अलग-अलग markets
          के लिए dedicated chart pages दिए गए हैं, जिससे users relevant
          information आसानी से access कर सकें।
        </p>

        <p className="mt-3">
          Website पर Faridabad, Ghaziabad, Gali और Disawar से संबंधित result
          pages और historical chart information उपलब्ध है।
        </p>
      </>
    ),
  },

  {
    title: 'Popular Result Sections',
    content: (
      <>
        <p>
          A786 Satta पर अलग-अलग popular result categories के लिए dedicated
          sections उपलब्ध हैं। Visitors अपनी जरूरत के अनुसार संबंधित chart
          page पर जाकर information देख सकते हैं।
        </p>

        <div className="mt-3 flex flex-col gap-2">
          <a
            href="/chart/faridabad"
            className="font-semibold underline"
          >
            Faridabad Satta Result
          </a>

          <a
            href="/chart/game-1773938625817"
            className="font-semibold underline"
          >
            Ghaziabad Satta Result
          </a>

          <a
            href="/chart/gali"
            className="font-semibold underline"
          >
            Gali Satta Result
          </a>

          <a
            href="/chart/disawar"
            className="font-semibold underline"
          >
            Disawar Satta Result
          </a>

          <a
            href="/chart/delhi-bazar"
            className="font-semibold underline"
          >
            Delhi Bazar Result
          </a>
        </div>
      </>
    ),
  },

  {
    title: 'A786 Satta Charts को समझना',
    content: (
      <>
        <p>
          A786 Satta के chart pages को इस तरह organize किया गया है कि visitors
          अलग-अलग dates और periods की available information आसानी से देख सकें।
          Historical chart data को relevant sections में रखा गया है ताकि
          navigation simple रहे।
        </p>

        <p className="mt-3">
          Popular chart sections में Faridabad, Ghaziabad, Gali और Disawar
          शामिल हैं। प्रत्येक section का dedicated page है, जिससे visitors
          संबंधित information तक सीधे पहुँच सकते हैं।
        </p>
      </>
    ),
  },

  {
    title: 'Faridabad, Ghaziabad, Gali और Disawar Results',
    content: (
      <>
        <p>
          <strong>A786 Satta</strong> पर Faridabad, Ghaziabad, Gali और Disawar
          के लिए अलग-अलग result और chart sections उपलब्ध हैं। इससे visitors
          अपनी पसंद के market से संबंधित information को आसानी से access कर
          सकते हैं।
        </p>

        <p className="mt-3">
          प्रत्येक section में relevant results और available historical chart
          information को organized format में प्रस्तुत किया जाता है।
        </p>
      </>
    ),
  },

  {
    title: 'A786 Satta पर Information क्यों देखें?',
    content: (
      <>
        <p>
          A786 Satta का focus results और chart information को clear और
          organized format में present करना है। Dedicated pages और simple
          navigation visitors को relevant section तक जल्दी पहुँचने में मदद
          करते हैं।
        </p>

        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Dedicated result and chart sections</li>
          <li>Faridabad, Ghaziabad, Gali और Disawar categories</li>
          <li>Organized historical chart information</li>
          <li>Simple website navigation</li>
        </ul>
      </>
    ),
  },
]

export default function SeoContent() {
  return (
    <div className="mt-8">
      {SECTIONS.map((section, index) => (
        <div key={index} className="mb-1">
          <div className="section-bar">
            <h2>{section.title}</h2>
          </div>

          <div
            className="px-4 py-4"
            style={{
              background: '#fff',
              borderBottom: '2px solid #FFE000',
            }}
          >
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: '#3a3000',
              }}
            >
              {section.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}