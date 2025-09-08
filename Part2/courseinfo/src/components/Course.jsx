const Header = ({course}) => <h1>{course}</h1>

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

const Part = (props) => (
    <li>{props.part.name} {props.part.exercises}</li>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    );
}

export default Course;
