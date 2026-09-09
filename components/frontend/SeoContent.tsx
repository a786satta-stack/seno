```tsx
const SECTIONS = [
  {
    title: 'Satta 786 क्या है?',
    content: (
      <>
        <p>
          <strong>Satta 786</strong> एक results और charts information platform
          है जहाँ visitors अलग-अलग markets से संबंधित available result
          information और historical charts एक organized format में देख सकते
          हैं। <strong>786 Satta</strong> से जुड़ी information को अलग-अलग
          sections में व्यवस्थित किया गया है ताकि users relevant pages तक
          आसानी से पहुँच सकें।
        </p>

        <p className="mt-3">
          Website पर Faridabad, Ghaziabad, Gali, Disawar और Delhi Bazar जैसे
          popular sections की available result और chart information दी गई है।
        </p>
      </>
    ),
  },

  {
    title: '786 Satta Result की जानकारी',
    content: (
      <>
        <p>
          <strong>786 Satta Result</strong> से संबंधित available information को
          dedicated result और chart pages पर structured तरीके से प्रस्तुत
          किया जाता है। Visitors अलग-अलग sections की historical information
          को संबंधित pages पर देख सकते हैं।
        </p>

        <p className="mt-3">
          <strong>Satta 786 Result</strong> से जुड़ी available information को
          simple layout में रखा गया है, जिससे users relevant result section
          तक आसानी से navigate कर सकें।
        </p>
      </>
    ),
  },

  {
    title: 'Popular Satta 786 Result Sections',
    content: (
      <>
        <p>
          <strong>Satta786</strong> से संबंधित अलग-अलग result और chart
          categories के लिए dedicated sections उपलब्ध हैं। प्रत्येक section
          में संबंधित market की available information को अलग page पर organize
          किया गया है।
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
    title: 'Satta Number 786 और Chart Information',
    content: (
      <>
        <p>
          <strong>Satta Number 786</strong> जैसे search terms के माध्यम से users
          results और historical chart information से संबंधित pages खोज सकते
          हैं। Website पर available chart data को date और category के अनुसार
          organized format में प्रस्तुत किया जाता है।
        </p>

        <p className="mt-3">
          <strong>786 Satta</strong> के अलग-अलग sections में available
          historical information को dedicated pages पर रखा गया है, जिससे
          navigation और information access करना आसान रहता है।
        </p>
      </>
    ),
  },

  {
    title: 'UP Satta 786 और Regional Result Information',
    content: (
      <>
        <p>
          <strong>UP Satta 786</strong> से संबंधित searches में users अलग-अलग
          regional result और chart information तलाश सकते हैं। Relevant
          sections को dedicated pages में organize किया गया है, जहाँ visitors
          available information देख सकते हैं।
        </p>

        <p className="mt-3">
          Faridabad, Ghaziabad, Gali और Disawar जैसे sections के लिए available
          result information को structured format में रखा गया है ताकि users
          relevant category को आसानी से identify कर सकें।
        </p>
      </>
    ),
  },

  {
    title: 'A786 Satta पर Result Information क्यों देखें?',
    content: (
      <>
        <p>
          <strong>A786 Satta</strong> का focus available results और historical
          chart information को clear और organized format में present करने पर
          है। <strong>Satta786</strong> से संबंधित pages को अलग-अलग sections
          में arrange किया गया है।
        </p>

        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Dedicated result और chart sections</li>
          <li>786 Satta से संबंधित organized information</li>
          <li>Historical chart information</li>
          <li>Faridabad, Ghaziabad, Gali और Disawar sections</li>
          <li>Simple और structured website navigation</li>
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