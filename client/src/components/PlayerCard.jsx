function PlayerCard({ name, role, jersey }) {

    return (
        <div>
            <h2>{name}</h2>
            <p>Role: {role}</p>
            <p>Jersey: {jersey}</p>
        </div>
    );

}

export default PlayerCard;