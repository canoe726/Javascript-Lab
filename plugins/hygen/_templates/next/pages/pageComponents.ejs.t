---
to: "<%= route1 ? route2 ? `src/pageComponents/${name}/${route1}/${route2}/${fileName}Main.tsx` : `src/pageComponents/${name}/${route1}/${fileName}Main.tsx` : `src/pageComponents/${name}/${fileName}Main.tsx` %>"
---

export default function <%= fileName %>Main() {
    const [example, setExample] = useState('')

    const exampleFunction = () => {}

    useEffect(() => {

    }, [])

    return (
        <section>
            <></>
        </section>
    )
}
