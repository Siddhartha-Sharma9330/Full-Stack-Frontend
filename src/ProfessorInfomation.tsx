function ProfessorInformation({
    id, name, email, 
}:{
    id: string;
    name: string;
    email: string;
}) {
    return (
        <div>
            <h1>Name: {name}</h1>
            <p>ID: {id}</p>
            <p>Email: {email}</p>
        </div>
    );
}

export default ProfessorInformation;
