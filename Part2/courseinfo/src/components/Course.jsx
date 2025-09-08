const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
    return (
        <div>
            <ul>
                {parts.map(part =>
                    <Part key={part.id} part={part} />)}
            </ul>
        </div>
    )
}

const Part = ({part}) => (
    <li>{part.name} {part.exercises}</li>
)

const Total = ({ total }) => <strong>Total of exercises {total}</strong>;

const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={totalExercises} />
        </div>
    );
}

export default Course;
