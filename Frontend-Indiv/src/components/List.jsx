const List = ({names}) => {
    return (
        <>
        <ul>
        {names.map((name, index) => (
            <li key={index}>{name}</li>
        ))}
        </ul>
        </>
    )
}