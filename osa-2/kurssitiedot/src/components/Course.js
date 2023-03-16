const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
      <Total parts={props.parts} />
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((n, i) => n + i.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const Part = (props) => {
  return (
    <p> {props.part.name} {props.part.exercises}</p>
  )
}

export default Course