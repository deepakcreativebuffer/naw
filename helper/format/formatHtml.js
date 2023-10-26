
export default function formatHtml(string) {
  return string?.split(/\n/g).map((element, i) => {
    return <div key={`html_${i}`}>
            {element}
            <br />
    </div>
  })
}